import courseController from "../controllers/course.controller";
import { auth_middleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import upload from "../middlewares/upload";
import validate from "../middlewares/validate";
import courseSchema from "../validations/course.validation";
import courseRouter from "./course.route";

/**
 * @description Educator routes
 * @access private
 */

// create course
courseRouter.post("/create", upload.single("thumbnail"), auth_middleware, roleMiddleware("educator"), validate(courseSchema), courseController.createCourse);

// get all draft courses
courseRouter.get("/draft", auth_middleware, roleMiddleware("educator", "admin"), courseController.getAllDraftCourse);

// get all courses by educator
courseRouter.get("/", auth_middleware, roleMiddleware("educator", "admin"), courseController.getAllCoursesByEducator);

// update course
courseRouter.patch("/:courseId", upload.single("thumbnail"), auth_middleware, roleMiddleware("educator"), courseController.updateCourse);

// delete course
courseRouter.delete("/:courseId", auth_middleware, roleMiddleware("educator", "admin"), courseController.deleteCourse);

// educator dashboard
courseRouter.get("/educator/dashboard", auth_middleware, roleMiddleware("educator", "admin"), courseController.educatorDashboard);
