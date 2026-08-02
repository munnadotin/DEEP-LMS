import { Router } from 'express';
import courseController from '../controllers/course.controller';
import { auth_middleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import validate from '../middlewares/validate';
import courseSchema from '../validations/course.validation';
import upload from '../middlewares/upload';
import chapterRouter from './chapter.route';
import { optionalMiddleware } from '../middlewares/optional.middleware';
import reviewController from '../controllers/review.controller';

const courseRouter = Router();

/**
 * @description Course Filter
 * @access public
 * @method GET
 */
courseRouter.get("/", courseController.filterCourses);

// create course
courseRouter.post("/create", upload.single("thumbnail"), auth_middleware, roleMiddleware("educator"), validate(courseSchema), courseController.createCourse);

// get all courses
courseRouter.get("/all", courseController.getAllCourses);

// get all draft courses
courseRouter.get("/draft", auth_middleware, roleMiddleware("educator", "admin"), courseController.getAllDraftCourse);

// get all courses by educator
courseRouter.get("/", auth_middleware, roleMiddleware("educator", "admin"), courseController.getAllCoursesByEducator);

// get course by slug
courseRouter.get("/:slug", optionalMiddleware, courseController.getCourseBySlug);

// update course
courseRouter.patch("/:courseId", upload.single("thumbnail"), auth_middleware, roleMiddleware("educator"), courseController.updateCourse);

// delete course
courseRouter.delete("/:courseId", auth_middleware, roleMiddleware("educator", "admin"), courseController.deleteCourse);

/**
 * @description Course Review
 * @access private
 * @member students only
 */
// create review
courseRouter.post("/:courseId/reviews", auth_middleware, roleMiddleware("student"), reviewController.createReview);

// get all reviews by courseId
courseRouter.get("/:courseId/reviews", reviewController.getReview);

// update review
courseRouter.put("/:courseId/review/:reviewId", auth_middleware, roleMiddleware("student"), reviewController.updateReview);

// delete review
courseRouter.delete("/:courseId/review/:reviewId", auth_middleware, roleMiddleware("student"), reviewController.deleteReview);
/**
 * @description Dashboard for Educator
 * @access private
 */

// educator dashboard
courseRouter.get("/educator/dashboard", auth_middleware, roleMiddleware("educator", "admin"), courseController.educatorDashboard);

/**
 * @desciption Chapter Routes
 * @route /chapter
 */
courseRouter.use("/:courseId/chapter", chapterRouter);

export default courseRouter;