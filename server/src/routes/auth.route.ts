import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import validate from '../middlewares/validate';
import registerSchema from '../validations/auth.validation';
import { auth_middleware } from '../middlewares/auth.middleware';

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


export default authRouter;