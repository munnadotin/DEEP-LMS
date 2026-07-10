import { z } from "zod";

const courseSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    thumbnail: z.string().url(),
    category: z.string().min(3).max(255),
    price: z.number().min(0),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    duration: z.string().min(3).max(255),
    language: z.string().min(3).max(255),
});

export default courseSchema;