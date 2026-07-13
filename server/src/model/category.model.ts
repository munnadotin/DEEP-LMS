import mongoose from "mongoose";
import { slugifyString } from "../utils/slug";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    }
})

categorySchema.pre("save", function () {
    if (this.isModified("name")) {
        this.slug = slugifyString(this.name);
    }
    return this;
})

export const Category = mongoose.model("Category", categorySchema)
