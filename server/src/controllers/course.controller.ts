import { Request, Response } from "express";
import { Course } from "../model/course.model";
import storageService from "../services/storage.service";
import { Category } from "../model/category.model";
import { Enroll } from "../model/enroll.model";
import { Chapter, Lesson } from "../types/Course.type";

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

// get all draft courses
const getAllDraftCourse = async (req: Request, res: Response) => {
    try {
        // return all courses with draft status
        const courses = await Course.find({ published: "draft", educator: req.user._id }).populate("educator", "name");

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

// get course by slug
const getCourseBySlug = async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug;

        if (!slug) {
            return res.status(400).json({
                success: false,
                message: "Course slug is required",
            });
        }

        const course = await Course.aggregate([
            {
                $match: {
                    slug: slug
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "educator",
                    foreignField: "_id",
                    as: "educator"
                }
            },
            {
                $lookup: {
                    from: "chapters",
                    localField: "_id",
                    foreignField: "course",
                    as: "chapters"
                }
            },
            {
                $unwind: "$chapters"
            },
            {
                $lookup: {
                    from: "lessons",
                    localField: "chapters._id",
                    foreignField: "chapter",
                    as: "lessons"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    title: { $first: "$title" },
                    price: { $first: "$price" },
                    description: { $first: "$description" },
                    thumbnail: { $first: "$thumbnail" },
                    category: { $first: "$category" },
                    ratings: { $first: "$ratings" },
                    level: { $first: "$level" },
                    educator: {
                        $first: {
                            _id: { $arrayElemAt: ["$educator._id", 0] },
                            name: { $arrayElemAt: ["$educator.name", 0] }
                        }
                    },
                    enrolledStudents: {
                        $first: "$enrolledStudents"
                    },
                    chapters: {
                        $push: {
                            _id: "$chapters._id",
                            title: "$chapters.title",
                            position: "$chapters.position",
                            lessons: "$lessons"
                        }
                    }
                }
            }
        ])

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found or Not Published",
            });
        }

        let isEnrolled = false;

        if (req.user) {
            isEnrolled = !!(await Enroll.exists({
                course: course[0]._id,
                user: req.user._id
            }))
        }

        const updatedChpaters = course[0].chapters.map((chapter: Chapter) => ({
            ...chapter,
            lessons: chapter.lessons.map((lesson: Lesson) => ({
                ...lesson,
                isFree: isEnrolled ? true : lesson.isFree
            }))
        }));

        const findedCourse = { ...course[0], isEnrolled, chapters: updatedChpaters }

        return res.status(200).json({
            success: true,
            message: "Course Retrieved",
            course: findedCourse,
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

/**
 * @description Course Filter
 */
const filterCourses = async (req: Request, res: Response) => {
    try {
        const { search, category, level, sort, page = 1, limit = 6 } = req.query;
        const query = {} as any;

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ]
        }
        if (level) {
            query.level = level as string;
        }
        if (category) {
            const categories = await Category.findOne({ slug: category as string });
            query.category = categories?._id;
        }

        // sort
        let sortObj = {} as any;
        switch (sort as string) {
            case "newest":
                sortObj = { createdAt: -1 };
                break;
            case "oldest":
                sortObj = { createdAt: 1 };
                break;
            case "price-low":
                sortObj = { price: -1 };
                break;
            case "level-high":
                sortObj = { level: 1 };
                break;
            default:
                sortObj = { createdAt: -1 };
                break;
        }

        const courses = await Course.find({ ...query, published: "published" })
            .sort(sortObj)
            .skip((page as number - 1) * (limit as number))
            .limit((limit as number))
            .populate("educator", "name");

        const total = await Course.countDocuments(query);
        const totalPages = Math.ceil(total / (limit as number));
        const currentPage = page as number;

        return res.status(200).json({
            success: true,
            message: "Courses Retrieved",
            courses,
            total,
            totalPages,
            currentPage,
            limit: limit as number,
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
    getAllDraftCourse,
    getCourseBySlug,
    updateCourse,
    deleteCourse,
    filterCourses,
}
export default courseController;