import { Router } from 'express';
import courseController from '../controllers/course.controller';
import chapterRouter from './chapter.route';
import { optionalMiddleware } from '../middlewares/optional.middleware';
import reviewController from '../controllers/review.controller';
import { auth_middleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import upload from '../middlewares/upload';
import validate from '../middlewares/validate';
import courseSchema from '../validations/course.validation';

const courseRouter = Router();

/**
 * @description all public routes
 * @access public
 * @method GET
 */
courseRouter.get("/", courseController.filterCourses);

// get all courses
courseRouter.get("/all", courseController.getAllCourses);

// EDUCATOR / ADMIN ROUTES

// get all draft courses
courseRouter.get("/draft", auth_middleware, roleMiddleware("educator", "admin"), courseController.getAllDraftCourse);

// get all courses by educator
courseRouter.get("/educator-courses", auth_middleware, roleMiddleware("educator", "admin"), courseController.getAllCoursesByEducator);

// educator dashboard
courseRouter.get("/educator/dashboard", auth_middleware, roleMiddleware("educator", "admin"), courseController.educatorDashboard);

// COURSE CREATION

// create course
courseRouter.post("/create", upload.single("thumbnail"), auth_middleware, roleMiddleware("educator"), validate(courseSchema), courseController.createCourse);

// REVIEWS

// get all reviews by courseId
courseRouter.get("/:courseId/reviews", reviewController.getReview);

// create review
courseRouter.post("/:courseId/reviews", auth_middleware, roleMiddleware("student"), reviewController.createReview);

// update review
courseRouter.put("/:courseId/review/:reviewId", auth_middleware, roleMiddleware("student"), reviewController.updateReview);

// delete review
courseRouter.delete("/:courseId/review/:reviewId", auth_middleware, roleMiddleware("student"), reviewController.deleteReview);

// get course by slug
courseRouter.get("/:slug", optionalMiddleware, courseController.getCourseBySlug);

// COURSE UPDATE / DELETE

// update course
courseRouter.patch("/:courseId", upload.single("thumbnail"), auth_middleware, roleMiddleware("educator"), courseController.updateCourse);

// delete course
courseRouter.delete("/:courseId", auth_middleware, roleMiddleware("educator", "admin"), courseController.deleteCourse);

/**
 * @description Chapter Routes
 * @route /chapter
 */
courseRouter.use("/:courseId/chapter", chapterRouter);

export default courseRouter;