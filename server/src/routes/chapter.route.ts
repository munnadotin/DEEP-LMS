import { Router } from "express";
import { auth_middleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import chapterController from "../controllers/chapter.controller";
import lessonRouter from "./lesson.route";

const chapterRouter = Router({ mergeParams: true });

// create chapter
chapterRouter.post("/create", auth_middleware, roleMiddleware("educator"), chapterController.createChapter);


/**
 * @desciption Lesson Routes
 * @route /lesson
 */
chapterRouter.use("/:chapterId/lesson", lessonRouter);

export default chapterRouter;
