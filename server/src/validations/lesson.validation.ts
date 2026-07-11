import { z } from "zod";

const lessonSchema = z.object({
    title: z.string().min(1, "Title is required"),
    isFree: z.coerce.boolean().default(false),
    resources: z.array(z.string()).default([]),
})

export default lessonSchema;