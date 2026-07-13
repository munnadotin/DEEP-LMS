import { Request, Response } from "express";
import { Course } from "../model/course.model";
import { Enroll } from "../model/enroll.model";
import { Lesson } from "../model/lesson.model";
import { Chapter } from "../model/chapter.model";
import mongoose from "mongoose";

// Enroll a course
const enrollCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const { paymentStatus } = req.body;

        const course = await Course.findById(courseId);
        // check if course exists
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }

        // check if user already enrolled
        const existingEnroll = await Enroll.findOne({ user: req.user._id, course: course._id });

        if (existingEnroll) {
            return res.status(400).json({
                success: false,
                message: "User already enrolled in this course",
            })
        }

        // create new enroll
        const enroll = await Enroll.create({
            course: course._id,
            user: req.user._id,
            paymentStatus,
        });
        return res.status(201).json({
            success: true,
            message: "Course enrolled successfully",
            data: enroll,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to enroll course",
            error: (error as Error).message,
        })
    }
}

// Get user enrollments
const getEnrollments = async (req: Request, res: Response) => {
    try {
        const enrollments = await Enroll.find({ user: req.user._id }).populate({
            path: "course",
            select: "title price thumbnail description",
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
    getEnrollments,
    updateEnrollProgress,
    continueWatchCourse,
};
export default enrollController;