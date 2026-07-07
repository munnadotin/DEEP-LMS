import { ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validate = <T extends ZodTypeAny>(schema: T) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            success: false,
            message: result.error.issues[0]!.message,
        })
        return;
    }
    req.body = result.data;
    next();
}

export default validate; 