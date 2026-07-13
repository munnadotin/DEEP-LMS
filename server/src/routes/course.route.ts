import { Router } from 'express';
import courseController from '../controllers/course.controller';
import { auth_middleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import validate from '../middlewares/validate';
import courseSchema from '../validations/course.validation';
import upload from '../middlewares/upload';
import chapterRouter from './chapter.route';

const courseRouter = Router();

// create course
courseRouter.post("/create", upload.single("thumbnail"), auth_middleware, roleMiddleware("educator"), validate(courseSchema), courseController.createCourse);

// get all courses
courseRouter.get("/all", courseController.getAllCourses);

// get course by id
courseRouter.get("/:id", courseController.getCourseById);

// update course
courseRouter.patch("/:courseId", upload.single("thumbnail"), auth_middleware, roleMiddleware("educator"), courseController.updateCourse);

// delete course
courseRouter.delete("/:courseId", auth_middleware, roleMiddleware("educator", "admin"), courseController.deleteCourse);

/**
 * @description Course Filter  
 * @access public
 * @method GET
 */
courseRouter.get("/", courseController.filterCourses);

/**
 * @desciption Chapter Routes
 * @route /chapter
 */
courseRouter.use("/:courseId/chapter", chapterRouter);

export default courseRouter;