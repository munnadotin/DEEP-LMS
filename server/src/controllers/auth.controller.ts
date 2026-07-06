import { Request, Response } from 'express';

const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
}

export const authController = {
    registerUser,
    loginUser,
}