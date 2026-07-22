import mongoose from "mongoose";
import { slugifyString } from "../utils/slug";

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
        url: {
            type: String,
            required: true,
        },
        fileId: {
            type: String,
            required: true,
        }
    },
    slug: {
        type: String,
        unique: true,
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
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    published: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true,
        default: "beginner",
    },
    duration: {
        type: Number,
        default: 0,
    },
    language: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

courseSchema.pre("save", function () {
    if (this.isModified("title")) {
        this.slug = slugifyString(this.title);
    }
    return this;
})

export const Course = mongoose.model("Course", courseSchema)
