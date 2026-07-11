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

const chapterController = {
    createChapter,
};
export default chapterController;