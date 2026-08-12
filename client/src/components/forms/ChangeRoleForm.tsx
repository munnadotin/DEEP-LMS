"use client";

import { EducatorType } from "@/types/Form.type";
import toast from "react-hot-toast";
import { AlertCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useApplyEducatorMutation, useCheckApplicationQuery } from "@/redux/features/authApi";
import useAuth from "@/hooks/useAuth";
import Loader from "../ui/Loader";
import { useEffect } from "react";

export default function ChangeRoleForm() {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, } = useForm<EducatorType>();
    const [applyEducator, { isLoading }] = useApplyEducatorMutation();
    const { data, isLoading: applicationLoading } = useCheckApplicationQuery(undefined, {
        skip: !user
    });
    

    useEffect(() => {
        if (data?.success === true) {
            toast.success(data?.message, {
                duration: 5000
            });
        }
    }, [data]);

    const onSubmit = async (data: EducatorType) => {
        try {
            const res = await applyEducator(data).unwrap();
            toast.success(res.message, {
                duration: 5000
            });
            reset();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to submit application.");
        }
    };

    if (applicationLoading) {
        return <Loader />;
    }

    return (
        <div className="max-w-md mx-auto p-6 text-[#3D2F24] rounded-xl border border-[#E6DFD5] tracking-tight">
            {/* Header */}
            <div className="border-b border-[#E6DFD5] pb-4 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D53] block mb-1">
                    Become an Educator
                </span>
                <h1 className="text-xl font-serif font-medium">Apply for Educator Role</h1>
                <p className="text-xs text-[#A39281] mt-1">
                    Share your credentials to start publishing courses.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Headline Input */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="headline"
                        className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]"
                    >
                        Headline
                    </label>
                    <input
                        id="headline"
                        type="text"
                        placeholder="e.g. Senior Software Developer"
                        {...register("headline", { required: "Headline is required" })}
                        className="w-full px-3.5 py-2.5 text-xs font-medium bg-white border border-[#E6DFD5] text-[#3D2F24] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] placeholder:text-[#C2B7AC]"
                    />
                    {errors.headline && (
                        <p className="text-[11px] text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> Headline is required
                        </p>
                    )}
                </div>

                {/* Bio Textarea */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="bio"
                        className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]"
                    >
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        rows={4}
                        placeholder="Briefly describe your teaching experience and specialty..."
                        {...register("bio", { required: "Bio is required" })}
                        className="w-full px-3.5 py-2.5 text-xs font-medium bg-white border border-[#E6DFD5] text-[#3D2F24] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] placeholder:text-[#C2B7AC] resize-none"
                    />
                    {errors.bio && (
                        <p className="text-[11px] text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> Bio is required
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#3D2F24] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-md hover:bg-[#2A2018] focus:outline-none focus:ring-2 focus:ring-[#8C6D53] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <Send className="h-3.5 w-3.5" />
                        {isSubmitting || isLoading ? "Submitting..." : "Submit Application"}
                    </button>
                </div>
            </form>
        </div>
    );
}