import { Router } from 'express';
import courseController from '../controllers/course.controller';
import { auth_middleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import validate from '../middlewares/validate';
import courseSchema from '../validations/course.validation';
import upload from '../middlewares/upload';

const courseRouter = Router();

// create course
courseRouter.post("/create", upload.single("thumbnail"), auth_middleware, roleMiddleware("educator"), courseController.createCourse);

// get all courses
// courseRouter.get("/all", getAllCourses);

// get course by slug
// courseRouter.get("/:slug", getCourseById);

export default courseRouter;