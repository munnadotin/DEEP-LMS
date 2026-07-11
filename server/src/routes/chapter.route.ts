import { Router } from "express";
import { auth_middleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import chapterController from "../controllers/chapter.controller";
import lessonRouter from "./lesson.route";

const chapterRouter = Router({ mergeParams: true });

// create chapter
chapterRouter.post("/create", auth_middleware, roleMiddleware("educator"), chapterController.createChapter);

// get all chapters
chapterRouter.get("/", chapterController.getAllChapters);

// update chapter
chapterRouter.patch("/:chapterId", auth_middleware, roleMiddleware("educator"), chapterController.updateChapter);

// delete chapter
chapterRouter.delete("/:chapterId", auth_middleware, roleMiddleware("educator"), chapterController.deleteChapter);

/**
 * @desciption Lesson Routes
 * @route /lesson
 */
chapterRouter.use("/:chapterId/lesson", lessonRouter);

export default chapterRouter;
