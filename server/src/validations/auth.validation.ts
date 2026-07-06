import { z } from 'zod';

const registerUser = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Email must be a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    role: z.enum(["educator", "student"]).default("student"),
}).strict();

export default registerUser;