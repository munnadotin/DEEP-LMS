import mongoose from "mongoose";

export interface EducatorModel extends Document {
    user: mongoose.Types.ObjectId,
    headline: string
    bio: string;
    status: "pending" | "approved" | "rejected",
    rejectedReason: String | null;
}