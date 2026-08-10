"use client"

import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EducatorLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        }
    }, [user, router]);
    
    return children;
}
