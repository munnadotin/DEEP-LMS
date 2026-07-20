import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../model/user.model';

interface MyJwtPayload extends JwtPayload {
    userId: string;
}

export const optionalMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;

            const user = await User.findById(decoded.userId);

            if (user) {
                req.user = user;
            }
        } catch (err) {

        }
    }

    next();
};