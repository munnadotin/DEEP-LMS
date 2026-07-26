import mongoose from "mongoose";
import { Request, Response } from "express";
import { Course } from "../model/course.model";
import { Enroll } from "../model/enroll.model";
import { Lesson } from "../model/lesson.model";
import { Chapter } from "../model/chapter.model";
import { razorpay } from "../config/razorpay";
import crypto from "crypto";

// Enroll a course
const enrollCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        // check if course exists
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }

        // check if user already enrolled
        const existingEnroll = await Enroll.findOne({ user: req.user._id, course: course._id, paymentStatus: "paid" });

        if (existingEnroll) {
            return res.status(400).json({
                success: false,
                message: "User already enrolled in this course",
            })
        }

        const options = {
            amount: course.price * 100,
            currency: "INR",
            receipt: `course_${course._id}`
        }

        const order = await razorpay.orders.create(options);

        // create new enroll
        const enroll = await Enroll.create({
            course: course._id,
            educator: course.educator,
            user: req.user._id,
            amount: course.price,
            currency: "INR",
            paymentGateway: "razorpay",
            paymentStatus: "pending",
            orderId: order.id
        });

        return res.status(201).json({
            success: true,
            message: "Course enrolled successfully",
            order,
            enroll,
            key: process.env.RAZORPAY_API_KEY
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to enroll course",
            error: (error as Error).message,
        })
    }
}

// Verify course
const verifyEnrollment = async (req: Request, res: Response) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!).update(body.toString()).digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed",
            });
        }

        const enroll = await Enroll.findOne({
            orderId: razorpay_order_id,
        });

        if (!enroll) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found",
            });
        }

        enroll.paymentStatus = "paid";
        enroll.transactionId = razorpay_payment_id;

        await enroll.save();

        await Course.findByIdAndUpdate(enroll.course, {
            $addToSet: {
                enrolledStudents: enroll.user,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Payment verified",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get enrollments",
            error: (error as Error).message,
        })
    }
}

// Get user enrollments
const getEnrollments = async (req: Request, res: Response) => {
    try {
        const enrollments = await Enroll.find({ user: req.user._id }).populate({
            path: "course",
            select: "title slug price thumbnail description",
        }).populate({ path: "lastLessonCompleted", select: "title" });

        return res.status(200).json({
            success: true,
            message: "Enrollments retrieved successfully",
            data: enrollments,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get enrollments",
            error: (error as Error).message,
        })
    }
}

// Update enroll progress
const updateEnrollProgress = async (req: Request, res: Response) => {
    try {
        const { courseId, lessonId } = req.params;

        if (!courseId || !lessonId) {
            return res.status(400).json({
                success: false,
                message: "Course ID or Lesson ID is required",
            })
        }

        const lesson = await Lesson.findById(lessonId);
        // check if lesson exists
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found",
            })
        }
        // check if enroll exists
        const existingEnroll = await Enroll.findOne({ user: req.user._id, course: courseId });

        if (!existingEnroll) {
            return res.status(404).json({
                success: false,
                message: "Enroll not found",
            })
        }

        // check lesson complete
        if (existingEnroll.completedLessons.includes(lesson._id)) {
            return res.status(400).json({
                success: false,
                message: "Lesson already completed",
            })
        }
        // update lesson completed
        existingEnroll.completedLessons.push(lesson._id);
        existingEnroll.lastLessonCompleted = lesson._id;
        await existingEnroll.save();

        const result = await Chapter.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId as string),
                }
            },
            {
                $lookup: {
                    from: "lessons",
                    localField: "_id",
                    foreignField: "chapter",
                    as: "lessons"
                }
            },
            {
                $project: {
                    totalLessons: { $size: "$lessons" },
                }
            },
            {
                $group: {
                    _id: courseId,
                    totalLessons: { $sum: "$totalLessons" },
                }
            }
        ])
        const totalLessons = result[0].totalLessons;

        // update progress
        const progress = Math.floor((existingEnroll.completedLessons.length / totalLessons) * 100);
        existingEnroll.progress = progress;
        await existingEnroll.save();

        return res.status(200).json({
            success: true,
            message: "Enroll progress updated successfully",
            data: existingEnroll,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update enroll progress",
            error: (error as Error).message,
        })
    }
}

// continue watch course
const continueWatchCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            })
        }
        // check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }
        // check if enroll exists
        const existingEnroll = await Enroll.findOne({ user: req.user._id, course: courseId });
        // check if lesson exists
        const lesson = await Lesson.findById(existingEnroll!.lastLessonCompleted);
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found",
            })
        }
        // check if lesson complete
        if (existingEnroll!.completedLessons.includes(lesson._id)) {
            return res.status(400).json({
                success: false,
                message: "Lesson already completed",
            })
        }
        // update lesson completed
        existingEnroll!.completedLessons.push(lesson._id);
        existingEnroll!.lastLessonCompleted = lesson._id;
        await existingEnroll!.save();

        return res.status(200).json({
            success: true,
            message: "Enroll progress updated successfully",
            data: existingEnroll!,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to continue watch course",
            error: (error as Error).message,
        })
    }
}

const enrollController = {
    enrollCourse,
    verifyEnrollment,
    getEnrollments,
    updateEnrollProgress,
    continueWatchCourse,
};
export default enrollController;