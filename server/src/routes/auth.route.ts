import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const authRouter = Router();

/**
 * Register a new user.
 * --- required
 * - name
 * - email
 * - password
 * - role
 */
authRouter.post("/register", authController.registerUser);

/**
 * Login a user.
 * --- required
 * - email
 * - password
 */
authRouter.post("/login", authController.loginUser);

export default authRouter;