import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import type { IUser, User } from "../types/User.type";

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    role: {
        type: String,
        enum: ["educator", "student"],
        default: "educator",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: [],
    }],
}, {
    timestamps: true,
})

// hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
})

// compare password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model<IUser>("User", userSchema);
export default User;