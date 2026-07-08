import { Document } from "mongoose";

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

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    role: "educator" | "student";
    comparePassword: (candidatePassword: string) => Promise<boolean>;
    isVerified: boolean;
}
