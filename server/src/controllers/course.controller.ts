import { Request, Response } from "express";
import { Course } from "../model/course.model";
import storageService from "../services/storage.service";

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
        const imageUrl = await storageService.uploadFile(file!.buffer, file?.originalname!);

        const course = await Course.create({
            title,
            description,
            thumbnail: {
                url: imageUrl.url!,
                fileId: imageUrl.fileId!,
            },
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
        // return all courses with published status
        const courses = await Course.find({ published: "published" }).populate("educator", "name");

        return res.status(200).json({
            success: true,
            message: "Courses Retrieved with Published Status",
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
        // add filter for published status
        const course = await Course.findOne({ _id: req.params.id, published: "published" }).populate("educator", "name");
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found or Not Published",
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
        const { title, description, category, price, level, language, published } = req.body;
        const { file } = req;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }
        // check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found",
            });
        }

        // update thumbnail image
        if (file) {
            const imageUrl = await storageService.uploadFile(file!.buffer, file?.originalname!);
            course.thumbnail = {
                url: imageUrl.url!,
                fileId: imageUrl.fileId!,
            };
        }

        // update course information if provided otherwise keep the old one
        course.title = title || course.title;
        course.description = description || course.description;
        course.category = category || course.category;
        course.price = price || course.price;
        course.level = level || course.level;
        course.language = language || course.language;
        course.published = published || course.published;

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
        // delete thumbnail image from storage
        if (course.thumbnail?.fileId) {
            await storageService.deleteFile(course.thumbnail.fileId);
        }
        // delete course from database
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