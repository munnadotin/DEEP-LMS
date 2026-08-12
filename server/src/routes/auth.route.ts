import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import validate from '../middlewares/validate';
import registerSchema from '../validations/auth.validation';
import { auth_middleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const authRouter = Router();

/**
 * Register a new user.
 * --- required
 * - name
 * - email
 * - password
 * - role
 */
authRouter.post("/register", validate(registerSchema), authController.registerUser);

/**
 * Verify a user account.
 * --- required
 * - token
 */
authRouter.get("/verify", authController.verifyAccount);

/**
 * Login a user.
 * --- required
 * - email
 * - password
 */
authRouter.post("/login", authController.loginUser);

/**
 * Get Me
 * --- required
 * - token
 */
authRouter.get("/me", auth_middleware, authController.getMe);

/**
 * Refresh Access Token
 * --- required
 * - refreshToken
 */
authRouter.post("/refresh-access-token", authController.refreshAccessToken);

/**
 * Logout a user.
 * --- required
 * - token
 */
authRouter.post("/logout", auth_middleware, authController.logoutUser);

// 
authRouter.post("/educator/apply", auth_middleware, roleMiddleware("student"), authController.apply)

// 
authRouter.get("/educator/application", auth_middleware, roleMiddleware("student"), authController.appliedCheck);

export default authRouter;