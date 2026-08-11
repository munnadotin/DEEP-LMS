import reviewController from "../controllers/review.controller";
import { auth_middleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import courseRouter from "./course.route";

/**
 * @description Course Review
 * @access private
 * @member students only
 */

// create review
courseRouter.post("/:courseId/reviews", auth_middleware, roleMiddleware("student"), reviewController.createReview);

// update review
courseRouter.put("/:courseId/review/:reviewId", auth_middleware, roleMiddleware("student"), reviewController.updateReview);

// delete review
courseRouter.delete("/:courseId/review/:reviewId", auth_middleware, roleMiddleware("student"), reviewController.deleteReview);
