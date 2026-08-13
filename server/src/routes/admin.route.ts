import { Router } from "express";
import { auth_middleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { adminController } from "../controllers/admin.controller";

export const adminRouter = Router();

// dashboard
adminRouter.get("/dashboard", auth_middleware, roleMiddleware("admin"), adminController.dashboard);

// get all applications
adminRouter.get("/applications", auth_middleware, roleMiddleware("admin"), adminController.getApplications);

// approve application
adminRouter.patch("/educators/:id/approve", auth_middleware, roleMiddleware("admin"), adminController.approveEducator);

// reject application
adminRouter.patch("/educators/:id/reject", auth_middleware, roleMiddleware("admin"), adminController.rejectEducator);

