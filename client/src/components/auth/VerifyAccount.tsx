"use client"

import { useVerifyAccountQuery } from "@/redux/features/authApi";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Loader from "../ui/Loader";

export default function AccountVerificationContent() {
    const params = useSearchParams();
    const token = params.get("token");

    useEffect(() => {
        if (!token) {
            toast.error("Token is required");
        }
    }, [token]);

    const { isLoading } = useVerifyAccountQuery(token ?? "", {
        skip: !token,
    });

    if (!token) {
        return <div className="p-4 text-red-500">Token is missing or invalid.</div>;
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-6 text-[#3D2F24] flex items-center justify-center h-[calc(100vh-400px)]">
            <h2 className="text-lg font-serif font-medium py-4 px-3">Account verified successfully!</h2>
        </div>
    );
}