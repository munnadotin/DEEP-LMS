import { z } from "zod";

const courseSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(3),
    category: z.string().min(3).max(255),
    price: z.coerce.number().min(0),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    language: z.string().min(3).max(255),
});

export default courseSchema;