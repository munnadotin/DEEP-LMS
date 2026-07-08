import { Request, Response } from 'express';
import User from '../model/user.model';
import { generateRegisterLinkToken, refreshTokenGenerator, accessTokenGenerator } from '../utils/tokenGenerator';
import sendEmail from '../services/emailSender';
import { redis } from '../config/redis';
import jwt from 'jsonwebtoken';

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
        const token = generateRegisterLinkToken(user._id.toString());

        await redis.set(
            `verify:${token}`,
            user._id.toString(),
            "EX",
            900 // 15 minutes
        );

        const verificationLink = `${process.env.CLIENT_URL}/auth/verify?token=${token}`;

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

const verifyAccount = async (req: Request, res: Response) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is required",
            })
        }

        // check if token exists in redis
        const userId = await redis.get(`verify:${token}`);
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token",
            })
        }
        // check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }
        // verify user account
        user.isVerified = true;
        await user.save();

        // delete token from redis
        await redis.del(`verify:${token}`);

        return res.status(200).json({
            success: true,
            message: "User account verified successfully",
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

        // check if user is verified
        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User account is not verified",
            })
        }

        // check password validity
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect",
            })
        }

        // refreshToken
        const refreshToken = refreshTokenGenerator(user._id.toString());
        // set refreshToken in cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })

        // accessToken
        const accessToken = accessTokenGenerator(user._id.toString());

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
            accessToken: accessToken
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

const getAccessToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Refresh token is required",
            })
        }

        // verify refreshToken
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
        if (!decoded) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired refresh token",
            })
        }
        // check if user exists
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }
        // generate accessToken
        const accessToken = accessTokenGenerator(user._id.toString());
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
            accessToken: accessToken
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

const getMe = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const { _id, name, email, role } = req.user;

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: {
                _id: _id.toString(),
                name: name,
                email: email,
                role: role,
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
    verifyAccount,
    getMe,
    getAccessToken,
}