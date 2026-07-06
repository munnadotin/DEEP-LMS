export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: "educator" | "student";
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}