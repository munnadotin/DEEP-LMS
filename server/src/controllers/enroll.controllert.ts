import { Request, Response } from "express";
import { Course } from "../model/course.model";
import { Enroll } from "../model/enroll.model";

// Enroll a course
async function enrollCourse(req: Request, res: Response) {
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
async function getEnrollments(req: Request, res: Response) {
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

const enrollController = {
    enrollCourse,
    getEnrollments,
};
export default enrollController;