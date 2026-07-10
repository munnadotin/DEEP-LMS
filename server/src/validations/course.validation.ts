import { z } from "zod";

const courseSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    thumbnail: z.string().url(),
    category: z.string().uuid(),
    price: z.number().min(0),
    educator: z.string().uuid(),
    enrolledStudents: z.array(z.string().uuid()),
    ratings: z.number().min(0),
    published: z.boolean(),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    duration: z.string().min(3).max(255),
    language: z.string().min(3).max(255),
})
export default courseSchema;