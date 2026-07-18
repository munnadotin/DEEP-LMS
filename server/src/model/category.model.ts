import mongoose from "mongoose";
import slugify from "slugify";

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
        this.slug = slugify(this.name,
            {
                lower: true,
                remove: /[*+~.()'"!-]/g,
                strict: true,
            }
        )
    }
    return this;
})

export const Category = mongoose.model("Category", categorySchema)
