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
        url: {
            type: String,
            required: true,
        },
        fileId: {
            type: String,
            required: true,
        }
    },
    isFree: {
        type: Boolean,
        default: false,
    },
    resources: {
        type: [String],
        default: [],
    },
    duration: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
})
export const Lesson = mongoose.model("Lesson", lessonSchema)