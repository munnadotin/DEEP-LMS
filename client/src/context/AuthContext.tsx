"use client";

import Loader from "@/components/ui/Loader";
import { useGetMeQuery } from "@/redux/features/authApi";
import { IUser } from "@/types/User.type";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

type AuthContextType = {
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        setToken(localStorage.getItem("accessToken"));
    }, []);
    const { data, isLoading } = useGetMeQuery(undefined, {
        skip: token === null,
    });


    useEffect(() => {
        if (data) {
            setUser(data.data);
        }
    }, [data]);

    if (token !== null && isLoading) return <Loader />;
    
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
