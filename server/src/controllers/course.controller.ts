import { Request, Response } from "express";
import uploadFile from "../services/storage.service";

// create course
const createCourse = async (req: Request, res: Response) => {
    try {
        const { title, description, category, price, level, language, duration, chapters } = req.body;
        const { file } = req;
        
        const imageUrl = await uploadFile(file!.buffer, file?.originalname!);
        return res.status(201).json({
            success: true,
            message: "Course Created",
            imageUrl,
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
}
export default courseController;