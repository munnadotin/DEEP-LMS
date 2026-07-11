import { Request, Response } from "express";
import uploadFile from "../services/storage.service";
import { Course } from "../model/course.model";

// create course
const createCourse = async (req: Request, res: Response) => {
    try {
        const { title, description, category, price, level, language } = req.body;
        const { file } = req;

        // validate input
        if (!title || !description || !category || !price || !level || !language) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        // validate thumbnail image
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a thumbnail image",
            });
        }

        // upload thumbnail image
        const imageUrl = await uploadFile(file!.buffer, file?.originalname!);

        const course = await Course.create({
            title,
            description,
            thumbnail: imageUrl!,
            category,
            price,
            level,
            language,
            educator: req.user._id,
        })

        return res.status(201).json({
            success: true,
            message: "Course Created",
            course,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

// get all courses
const getAllCourses = async (_req: Request, res: Response) => {
    try {
        const courses = await Course.find().populate("educator", "name");
        return res.status(200).json({
            success: true,
            message: "Courses Retrieved",
            courses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

// get course by id
const getCourseById = async (req: Request, res: Response) => {
    try {
        const course = await Course.findById(req.params.id).populate("educator", "name");
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Course Retrieved",
            course,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

// update course
const updateCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const { title, description, category, price, level, language } = req.body;
        const { file } = req;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found",
            });
        }

        // update thumbnail image
        if (file) {
            const imageUrl = await uploadFile(file!.buffer, file?.originalname!);
            course.thumbnail = imageUrl!;
        }

        // update course information if provided otherwise keep the old one
        course.title = title || course.title;
        course.description = description || course.description;
        course.category = category || course.category;
        course.price = price || course.price;
        course.level = level || course.level;
        course.language = language || course.language;

        await course.save();
        return res.status(200).json({
            success: true,
            message: "Course Updated",
            course,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

// delete course
const deleteCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found",
            });
        }
        await course.deleteOne({ _id: courseId });
        return res.status(200).json({
            success: true,
            message: "Course Deleted",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

const courseController = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
}
export default courseController;