import { Request, Response } from 'express';
import User from '../model/user.model';
import generateRegisterLinkToken from '../utils/tokenGenerator';
import sendEmail from '../services/emailSender';
import bcrypt from 'bcryptjs';

const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    try {
        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            })
        }
        // create new user
        const user = await User.create({
            name,
            email,
            password,
            role,
        });

        // generate link for verification
        const verificationLink = `http://localhost:3000/verify/${generateRegisterLinkToken(user._id.toString())}`;
        
        // send verification email to user
        await sendEmail(user.email, "Verify Your Email", verificationLink);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                name,
                email,
                role,
            },
            verificationLink,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // check if user exists
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email not found",
            })
        }
        // check password validity
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect",
            })
        }

        // accessToken

        // refreshToken

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
                accessToken: ""
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

export const authController = {
    registerUser,
    loginUser,
}