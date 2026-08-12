import mongoose from "mongoose";
import type { EducatorModel } from "../types/Educator.type";

const educatorSchema = new mongoose.Schema<EducatorModel>({
    user: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    headline: {
        type: String,
        require: true
    },
    bio: String,
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    rejectedReason: {
        type: String || null,
        default: null
    },
}, {
    timestamps: true
});

export const Educator = mongoose.model<EducatorModel>("Educator", educatorSchema);