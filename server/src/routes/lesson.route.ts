import { Router } from 'express';
import { auth_middleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import lessonController from '../controllers/lesson.controller';
import validate from '../middlewares/validate';
import lessonSchema from '../validations/lesson.validation';
import upload from '../middlewares/upload';

const lessonRouter = Router({ mergeParams: true });

// create lesson
lessonRouter.post("/create", upload.single("video"), auth_middleware, roleMiddleware("educator"), validate(lessonSchema), lessonController.createLesson);

// get all lessons
lessonRouter.get("/", lessonController.getAllLessons);

// get lesson by id
lessonRouter.get("/:lessonId", lessonController.getLessonById);

// update lesson
lessonRouter.patch("/:lessonId", upload.single("video"), auth_middleware, roleMiddleware("educator"), lessonController.updateLesson);

// delete lesson
lessonRouter.delete("/:lessonId", auth_middleware, roleMiddleware("educator"), lessonController.deleteLesson);

export default lessonRouter;
