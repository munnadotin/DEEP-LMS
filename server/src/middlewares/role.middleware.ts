import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (...role: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Check if the user has the required role
        if (!role.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }
        next();
    }
}