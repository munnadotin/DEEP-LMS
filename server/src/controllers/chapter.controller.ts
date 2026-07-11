import { Request, Response } from "express";
import { Chapter } from "../model/chapter.model";
import { Course } from "../model/course.model";

// create chapter
const createChapter = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const { title, position } = req.body;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        if (!title || !position) {
            return res.status(400).json({
                success: false,
                message: "Title and Position are required",
            });
        }

        // check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found",
            });
        }

        // create chapter
        const chapter = await Chapter.create({
            course: course._id,
            title,
            position,
        });

        return res.status(200).json({
            success: true,
            message: "Chapter Created",
            chapter,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

// get all chapters
const getAllChapters = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        // check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found",
            });
        }

        const chapters = await Chapter.find({ course: course._id }).sort({ position: 1 });

        return res.status(200).json({
            success: true,
            message: "Chapters Fetched",
            chapters,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

// update chapter
const updateChapter = async (req: Request, res: Response) => {
    try {
        const { chapterId } = req.params;
        const { title, position } = req.body;

        if (!chapterId) {
            return res.status(400).json({
                success: false,
                message: "Chapter ID is required",
            });
        }

        // check if chapter exists
        const chapter = await Chapter.findById(chapterId);
        if (!chapter) {
            return res.status(404).json({
                success: false,
                message: "Chapter Not Found",
            });
        }

        // update chapter if title or position is provided otherwise old values
        const updatedChapter = await Chapter.findByIdAndUpdate(chapter._id, { title: title || chapter.title, position: position || chapter.position }, { returnDocument: "after" });

        return res.status(200).json({
            success: true,
            message: "Chapter Updated",
            chapter: updatedChapter,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
};

// delete chapter
const deleteChapter = async (req: Request, res: Response) => {
    try {
        const { chapterId } = req.params;
        if (!chapterId) {
            return res.status(400).json({
                success: false,
                message: "Chapter ID is required",
            });
        }

        // check if chapter exists
        const chapter = await Chapter.findById(chapterId);
        if (!chapter) {
            return res.status(404).json({
                success: false,
                message: "Chapter Not Found",
            });
        }

        // delete chapter
        await Chapter.findByIdAndDelete(chapterId);
        return res.status(200).json({
            success: true,
            message: "Chapter Deleted",
            chapter,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
};

const chapterController = {
    createChapter,
    getAllChapters,
    updateChapter,
    deleteChapter,
};
export default chapterController;