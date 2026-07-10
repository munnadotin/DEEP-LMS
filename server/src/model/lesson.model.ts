import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    isFree: {
        type: Boolean,
        default: false,
    },
    resources: {
        type: [String],
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})
export const Lesson = mongoose.model("Lesson", lessonSchema)