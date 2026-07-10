import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    educator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    enrolledStudents: {
        type: Number,
        default: 0,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    published: {
        type: Boolean,
        default: false,
    },
    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true,
        default: "beginner",
    },
    duration: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

export const Course = mongoose.model("Course", courseSchema)
