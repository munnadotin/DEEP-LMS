import { Request, Response } from "express";
import { Educator } from "../model/educator.model";
import User from "../model/user.model";
import { Course } from "../model/course.model";
import { Enroll } from "../model/enroll.model";

// approve application
const approveEducator = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is required for approve application"
            })
        }

        const educator = await Educator.findById(id);

        if (!educator) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            })
        }

        if (educator.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: `Application has already been ${educator.status}`
            })
        }

        educator.status = "approved";
        await educator?.save();

        await User.findByIdAndUpdate(educator.user, {
            role: "educator"
        });

        return res.status(200).json({
            success: true,
            message: "Educator approved successfully."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

// reject application
const rejectEducator = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { rejectedReason } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is required for rejection",
            })
        }

        const educator = await Educator.findById(id);
        if (!educator) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            })
        }

        educator.status = "rejected";
        educator.rejectedReason = rejectedReason;
        await educator.save();

        await User.findByIdAndUpdate(educator.user, {
            role: "student"
        });

        return res.status(200).json({
            success: true,
            message: "Educator rejected"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

// get all applications
const getApplications = async (_req: Request, res: Response) => {
    try {
        const applications = await Educator.find({ status: 'pending' }).populate("user", "name email");

        if (applications.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No applications are received",
                applications
            })
        }

        return res.status(200).json({
            success: true,
            message: "All retrieved applications",
            applications
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

// dashboard stats
const dashboard = async (_req: Request, res: Response) => {
    try {
        const [totalStudents, totalEducators, totalCourses, pendingEducatorApplications, totalEnrollments] = await Promise.all([
            User.countDocuments({ role: "student" }),
            User.countDocuments({ role: "educator" }),
            Course.countDocuments({ published: 'published' }),
            Educator.countDocuments({ status: 'pending' }),
            Enroll.countDocuments({ paymentStatus: "paid" }),
        ]);

        const revenue = await Enroll.aggregate([
            {
                $match: {
                    paymentStatus: "paid"
                }
            },
            {
                $group: {
                    _id: null,
                    totalEnrollments: { $sum: 1 },
                    totalRevenue: { $sum: "$amount" }
                }
            }
        ])

        return res.status(200).json({
            success: true,
            message: "Stats retrieved successfully.",
            dashboard: {
                totalStudents,
                totalEducators,
                totalCourses,
                pendingEducatorApplications,
                totalEnrollments,
                revenue: revenue[0],
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

// get all users 
const getUsers = async (req: Request, res: Response) => {
    try {
        const { search, role, page = 1, limit = 10 } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        let query = {} as any;

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ]
        }

        if (role) {
            query.role = role;
        }

        const [users, total] = await Promise.all([
            User.find(query)
                .sort({ name: 1 })
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber),

            User.countDocuments(query)
        ]);

        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            users,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                total,
                totalPages: Math.ceil(total / limitNumber)
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

export const adminController = {
    approveEducator,
    rejectEducator,
    getApplications,
    dashboard,
    getUsers
}