import mongoose from "mongoose";

const enrollSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["paid", "unpaid"],
        required: true,
        default: "unpaid",
    },
    progress: {
        type: Number,
        default: 0,
    },
    completedLessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        default: [],
    }],
    lastLessonCompleted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        default: null,
    },
}, {
    timestamps: true,
})
export const Enroll = mongoose.model("Enroll", enrollSchema)