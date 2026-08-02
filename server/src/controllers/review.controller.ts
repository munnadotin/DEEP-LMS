import { Request, Response } from 'express';
import { Review } from '../model/review.model';
import { Course } from '../model/course.model';
import mongoose from 'mongoose';

// create review on course
const createReview = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const { rating, comment } = req.body;

        if (!courseId || !rating || !comment) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            })
        }

        const existingReview = await Review.findOne({ user: req.user?._id, course: courseId });
        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this course",
            })
        }

        const courseExists = await Course.findOne({ _id: courseId });

        if (!courseExists) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }

        // Creating review
        const review = await Review.create({
            user: req.user?._id,
            course: courseId as string,
            rating: parseInt(rating as string),
            comment: comment as string,
        })

        const result = await Review.aggregate([
            {
                $match: { course: new mongoose.Types.ObjectId(courseId as string) }
            },
            {
                $group: {
                    _id: "$course",
                    averageRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        // update course review stats
        await courseExists.updateOne({
            averageRating: result[0]?.averageRating || 0,
            totalReviews: result[0]?.totalReviews || 0,
        })

        return res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: review
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to continue watch course",
            error: (error as Error).message,
        })
    }
}

// get all reviews by courseId
const getReview = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            })
        }

        const reviews = await Review.find({ course: courseId }).populate('user', 'name email');

        return res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to continue watch course",
            error: (error as Error).message,
        })
    }
}

// update review by (course or review id)
const updateReview = async (req: Request, res: Response) => {
    try {
        const { courseId, reviewId } = req.params;
        const { rating, comment } = req.body;

        if (!courseId || !reviewId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            })
        }

        const review = await Review.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: review
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to continue watch course",
            error: (error as Error).message,
        })
    }
}

// delete review by (course or review id)
const deleteReview = async (req: Request, res: Response) => {
    try {
        const { courseId, reviewId } = req.params;

        if (!courseId || !reviewId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            })
        }

        const review = await Review.findByIdAndDelete(reviewId);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            data: review
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to continue watch course",
            error: (error as Error).message,
        })
    }
}

const reviewController = {
    createReview,
    getReview,
    updateReview,
    deleteReview
};
export default reviewController;