import { z } from "zod";

const lessonSchema = z.object({
    title: z.string().min(1, "Title is required"),
    isFree: z.preprocess((val) => {
        if (val === "true") return true;
        if (val === "false") return false;
        return val;
    }, z.boolean().default(false)),
    resources: z.array(z.string()).default([]),
})

export default lessonSchema;