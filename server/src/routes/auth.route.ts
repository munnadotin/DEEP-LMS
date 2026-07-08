import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import validate from '../middlewares/validate';
import registerSchema from '../validations/auth.validation';

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

export default authRouter;