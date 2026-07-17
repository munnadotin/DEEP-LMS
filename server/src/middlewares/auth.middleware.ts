import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../model/user.model';

interface MyJwtPayload extends JwtPayload {
  userId: string;
}

export async function auth_middleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access token is required",
            })
        }
        // verify accessToken
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;
        if (!decoded.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired access token",
            })
        }
        // check if user exists
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            })
        }
        // set user to req
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token",
        })
    }
}