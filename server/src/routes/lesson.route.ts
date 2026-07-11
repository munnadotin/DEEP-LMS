import { Router, Request, Response } from 'express';

const lessonRouter = Router({ mergeParams: true });

lessonRouter.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Lesson Created",
    })
})
export default lessonRouter;
