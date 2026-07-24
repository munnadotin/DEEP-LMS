import { Request, Response } from 'express';
import { Chapter } from '../model/chapter.model';
import { Lesson } from '../model/lesson.model';
import storageService from '../services/storage.service';
import { Course } from '../model/course.model';

// create lesson
const createLesson = async (req: Request, res: Response) => {
    try {
        const { courseId, chapterId } = req.params;
        const { title, isFree, resources } = req.body;
        const { file } = req;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            })
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }

        if (!chapterId) {
            return res.status(400).json({
                success: false,
                message: "Chapter ID is required",
            })
        }

        // check if chapter exists
        const chapter = await Chapter.findById(chapterId);

        if (!chapter) {
            return res.status(404).json({
                success: false,
                message: "Chapter not found",
            })
        }

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Video is required",
            })
        }

        // upload video to storage
        const videoUrl = await storageService.uploadFile(file.buffer, `${chapterId}-${title}-${Date.now()}.mp4`);
        if (!videoUrl) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload video",
            })
        }
        // create lesson
        const lesson = await Lesson.create({
            title,
            isFree,
            resources,
            video: {
                url: videoUrl.url!,
                fileId: videoUrl.fileId!,
            },
            duration: videoUrl.duration!,
            chapter: chapter._id,
        });

        const lessons = await Lesson.find({ chapter: chapterId });

        const totalDuration = lessons.reduce((sum, lesson) => {
            return sum + lesson.duration
        }, 0);

        chapter.totalDuration = totalDuration;
        await chapter.save();
        
        return res.status(201).json({
            success: true,
            message: "Lesson created successfully",
            lesson: lesson,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message,
        })
    }
}

// get all lessons
const getAllLessons = async (req: Request, res: Response) => {
    try {
        const { chapterId } = req.params;
        if (!chapterId) {
            return res.status(400).json({
                success: false,
                message: "Chapter ID is required",
            })
        }

        // check if chapter exists
        const chapter = await Chapter.findById(chapterId);
        if (!chapter) {
            return res.status(404).json({
                success: false,
                message: "Chapter not found",
            })
        }
        // check if chapter has lessons
        const lessons = await Lesson.find({ chapter: chapterId });
        return res.status(200).json({
            success: true,
            message: "Lessons retrieved successfully",
            lessons: lessons,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message,
        })
    }
}

// get lesson by id
const getLessonById = async (req: Request, res: Response) => {
    try {
        const { chapterId, lessonId } = req.params;
        if (!lessonId || !chapterId) {
            return res.status(400).json({
                success: false,
                message: "Lesson ID and Chapter ID is required",
            })
        }
        // check if chapter exists
        const chapter = await Chapter.findById(chapterId);
        if (!chapter) {
            return res.status(404).json({
                success: false,
                message: "Chapter not found",
            })
        }
        // check if chapter has lesson
        const lesson = await Lesson.findById({ _id: lessonId, chapter: chapterId });
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Lesson retrieved successfully",
            lesson: lesson,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message,
        })
    }
}

// update lesson
const updateLesson = async (req: Request, res: Response) => {
    try {
        const { chapterId, lessonId } = req.params;
        const { title, isFree, resources } = req.body;
        const { file } = req;

        if (!lessonId || !chapterId) {
            return res.status(400).json({
                success: false,
                message: "Lesson ID and Chapter ID is required",
            })
        }
        // check if chapter exists
        const chapter = await Chapter.findById(chapterId);
        if (!chapter) {
            return res.status(404).json({
                success: false,
                message: "Chapter not found",
            })
        }
        // check if chapter has lesson
        const lesson = await Lesson.findById({ _id: lessonId, chapter: chapterId });
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found",
            })
        }

        // update lesson data
        if (title) {
            lesson.title = title || lesson.title;
        }
        if (isFree !== undefined) {
            lesson.isFree = isFree;
        }
        if (resources) {
            lesson.resources = resources || lesson.resources;
        }

        // update video file
        if (file) {
            // upload video file to storage
            const result = await storageService.uploadFile(file.buffer, file.originalname);
            if (lesson.video) {
                lesson.video.url = result.url!;
                lesson.video.fileId = result.fileId!;
                lesson.duration = result.duration!;
            }
        }

        // save lesson
        await lesson.save();

        return res.status(200).json({
            success: true,
            message: "Lesson updated successfully",
            lesson: lesson,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message,
        })
    }
}

// delete lesson
const deleteLesson = async (req: Request, res: Response) => {
    try {
        const { chapterId, lessonId } = req.params;
        if (!lessonId || !chapterId) {
            return res.status(400).json({
                success: false,
                message: "Lesson ID and Chapter ID is required",
            })
        }
        // check if chapter exists
        const chapter = await Chapter.findById(chapterId);
        if (!chapter) {
            return res.status(404).json({
                success: false,
                message: "Chapter not found",
            })
        }
        // check if chapter has lesson
        const lesson = await Lesson.findById({ _id: lessonId, chapter: chapterId });
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found",
            })
        };

        // delete video file from storage
        if (lesson.video?.fileId) {
            await storageService.deleteFile(lesson.video.fileId);
        }

        // delete lesson
        await lesson.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Lesson deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message,
        })
    }
}

const lessonController = {
    createLesson,
    getAllLessons,
    getLessonById,
    updateLesson,
    deleteLesson,
};
export default lessonController;