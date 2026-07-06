import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema);

export default User;
