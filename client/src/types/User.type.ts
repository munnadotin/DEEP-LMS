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