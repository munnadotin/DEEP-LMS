import { Request, Response } from 'express';
import { Review } from '../model/review.model';

// create review on courses
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

        const courseExists = await Review.findOne({ course: courseId });
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
                $match: { course: courseId }
            },
            {
                $group: {
                    _id: "$course",
                    averageRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            }
        ])

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