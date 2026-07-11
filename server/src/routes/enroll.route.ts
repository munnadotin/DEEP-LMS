import { Router } from "express";
import { auth_middleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import enrollController from "../controllers/enroll.controllert";

const enrollRouter = Router();

// Enroll a course
enrollRouter.post("/enroll/:courseId", auth_middleware, roleMiddleware("student"), enrollController.enrollCourse);

// Get user enrollments
enrollRouter.get("/", auth_middleware, roleMiddleware("student"), enrollController.getEnrollments);

export default enrollRouter;
