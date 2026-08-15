export interface LoginUser {
    email: string;
    password: string;
}

export interface RegisterUser extends LoginUser {
    name: string;
    role: "educator" | "student" | "admin";
}

export interface IUser extends LoginUser, RegisterUser {
    _id: string;
    isVerified?: boolean
}

export interface User {
    user: IUser | null;
}

export interface UserApplication {
    _id: string;
    user: {
        name: string;
        email: string;
    }
    headline: string;
    bio: string;
    status: "pending" | "approved" | "rejected"
}

export interface ValidateUser {
    _id: string;
    name: string;
    email: string;
    isVerified: boolean;
    role: "student" | "educator" | "admin";
}