import mongoose from "mongoose";

const enrollSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        educator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            default: 0,
        },

        currency: {
            type: String,
            default: "INR",
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "refunded"],
            default: "pending",
        },

        paymentGateway: {
            type: String,
            enum: ["razorpay", "stripe", "free"],
            default: "free",
        },

        transactionId: {
            type: String,
            default: null,
        },

        orderId: {
            type: String,
            default: null,
        },

        progress: {
            type: Number,
            default: 0,
        },

        completedLessons: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lesson",
            },
        ],

        lastLessonCompleted: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const Enroll = mongoose.model("Enroll", enrollSchema);