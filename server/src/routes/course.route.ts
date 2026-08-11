import { Router } from 'express';
import courseController from '../controllers/course.controller';
import chapterRouter from './chapter.route';
import { optionalMiddleware } from '../middlewares/optional.middleware';
import reviewController from '../controllers/review.controller';

const courseRouter = Router();

/**
 * @description all public routes
 * @access public
 * @method GET
 */
courseRouter.get("/", courseController.filterCourses);

// get all courses
courseRouter.get("/all", courseController.getAllCourses);

// get course by slug
courseRouter.get("/:slug", optionalMiddleware, courseController.getCourseBySlug);

// get all reviews by courseId
courseRouter.get("/:courseId/reviews", reviewController.getReview);

/**
 * @desciption Chapter Routes
 * @route /chapter
 */
courseRouter.use("/:courseId/chapter", chapterRouter);

export default courseRouter;