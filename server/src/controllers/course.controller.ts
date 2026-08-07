import { Request, Response } from "express";
import { Course } from "../model/course.model";
import storageService from "../services/storage.service";
import { Category } from "../model/category.model";
import { Enroll } from "../model/enroll.model";
import { Chapter, Lesson } from "../types/Course.type";
import { Review } from "../model/review.model";
import { redis } from "../config/redis";

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

        // del courses from cache
        await Promise.all([
            redis.del("courses"),
            redis.del(`educator:draft:courses:${req.user._id}`)
        ])

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
        // cache hit
        const cachedCourses = await redis.get("courses");

        if (cachedCourses) {
            return res.status(200).json({
                success: true,
                message: "Courses Retrieved from Cache",
                courses: JSON.parse(cachedCourses)
            })
        }
        const courses = await Course.find({ published: "published" }).populate("educator", "name");

        // cache miss
        await redis.set("courses", JSON.stringify(courses), "EX", 60 * 60); // cache for 1 hour

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
        // cache hit 
        const cachedCourses = await redis.get(`educator:draft:courses:${req.user._id}`);

        if (cachedCourses) {
            return res.status(200).json({
                status: true,
                message: "Draft courses retrieved from cache",
                courses: JSON.parse(cachedCourses),
            })
        }
        const courses = await Course.find({ published: "draft", educator: req.user._id }).populate("educator", "name");

        // cache miss
        await redis.set(`educator:draft:courses:${req.user._id}`, JSON.stringify(courses), "EX", 300);

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

// get all courses by educator
const getAllCoursesByEducator = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find({ educator: req.user._id, published: "published" });
        // cache hit
        const cachedCourse = await redis.get(`educator:publish:courses:${req.user._id}`);

        if (cachedCourse) {
            return res.status(200).json({
                status: true,
                message: "Courses Retrieved Successfully from cache",
                courses: JSON.parse(cachedCourse)
            })
        }

        // cache miss
        await redis.set(`educator:publish:courses:${req.user._id}`, JSON.stringify(courses), "EX", 60 * 60); // 1 hour

        return res.status(200).json({
            success: true,
            message: "Courses Retrieved Successfully from database",
            courses
        })
    }
    catch (error) {
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

        if (course.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found",
            });
        }

        let duration = 0;
        duration = course[0].chapters.reduce((total: number, chapter: Chapter) => {
            const chapterDuration = chapter.lessons.reduce((chapterTotal: number, lesson: Lesson) => chapterTotal + lesson.duration, 0);
            return total + chapterDuration;
        }, 0);

        // show review
        const review = await Review.find({ course: course[0]._id }).populate("user", "name");

        let isEnrolled = false;

        if (req.user) {
            isEnrolled = !!(await Enroll.exists({
                course: course[0]._id,
                user: req.user._id,
                paymentStatus: "paid"
            }))
        }

        const updatedChapters = course[0].chapters.map((chapter: Chapter) => ({
            ...chapter,
            lessons: chapter.lessons.map((lesson: Lesson) => ({
                ...lesson,
                isFree: isEnrolled ? true : lesson.isFree
            }))
        }));

        const findedCourse = { ...course[0], review, duration, isEnrolled, chapters: updatedChapters };

        return res.status(200).json({
            success: true,
            message: "Course Retrieved from database",
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

        await Promise.all([
            redis.del(`educator:draft:courses:${req.user._id}`),
            redis.del(`educator:publish:courses:${req.user._id}`),
            redis.del(`courses`),
        ]);

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

        // del course from cache
        await Promise.all([
            redis.del(`educator:publish:courses:${req.user._id}`),
            redis.del(`educator:draft:courses:${req.user._id}`),
            redis.del("courses"),
        ])

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

// dashboard
const educatorDashboard = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find({ educator: req.user._id }).sort({ createdAt: -1 });
        const totalStudents = courses.reduce((sum, coures) => (sum + coures.enrolledStudents.length), 0);
        const publishedCourse = courses.filter((coures) => (coures.published === "published")).length;
        const draftCoures = courses.filter((coures) => (coures.published === "draft")).length;
        const totalDuration = courses.reduce((sum, course) => (sum + course.duration), 0) || 0;
        const recentCourses = courses.slice(0, 3);

        const revenue = await Enroll.aggregate([
            {
                $match: {
                    educator: req.user._id,
                    paymentStatus: "paid",
                },
            },
            {
                $group: {
                    _id: null,
                    revenue: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            message: "dashboard data retrieved successfully",
            data: {
                totalCourses: courses.length,
                totalStudents,
                publishedCourse,
                draftCoures,
                totalDuration,
                recentCourses,
                revenue,
            }
        })
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

        const cacheKey = JSON.stringify(req.query);

        // cache hit
        const cachedCourse = await redis.get(cacheKey);
        if (cachedCourse) {
            return res.status(200).json({
                status: true,
                message: "Course Retrieved from Cache",
                course: JSON.parse(cachedCourse)
            })
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
                sortObj = { price: 1 };
                break;
            case "price-high":
                sortObj = { price: -1 };
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
        const pagination = {
            page,
            limit,
            totalCourse: total,
            totalPages,
            hasNextPage: (page as number) < totalPages,
            hasPrevPage: (page as number) > 1,
        }

        const response = {
            success: true,
            message: "Course Retrieved from database",
            courses,
            pagination
        };

        // cache miss
        await redis.set(cacheKey, JSON.stringify(response), "EX", 300); // 5 min

        return res.status(200).json(response);

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
    getAllCoursesByEducator,
    getCourseBySlug,
    updateCourse,
    deleteCourse,
    educatorDashboard,
    filterCourses,
}
export default courseController;