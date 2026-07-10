import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
})
export const Chapter = mongoose.model("Chapter", chapterSchema)