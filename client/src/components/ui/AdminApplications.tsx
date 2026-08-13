"use client"

import { useApproveApplicationMutation } from "@/redux/features/authApi"
import { UserApplication } from "@/types/User.type"
import { AlertCircle, Check, Clock, Loader2, Mail, User, X } from "lucide-react"
import { useState } from "react";
import toast from "react-hot-toast";
import RejectionForm from "../forms/RejectionForm";

export default function AdminApplications(applications: { applications: UserApplication[] }) {
    const [approveApplication, { isLoading: approveLoader }] = useApproveApplicationMutation();
    const [selectedId, setSelectedId] = useState<string>("");
    const [activeForm, setActiveForm] = useState(false);

    const handleApprove = async (id: string) => {
        try {
            const res = await approveApplication(id).unwrap();
            toast.success(res.message);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to approve application")
        }
    }

    return (
        <div className="pt-5">
            {applications.applications.length > 0 ? (
                <div className="space-y-4">
                    {applications.applications.map((apply: UserApplication) => (
                        <div
                            key={apply._id}
                            className="bg-white border border-[#E6DFD5] rounded-xl p-5 shadow-sm hover:border-[#8C6D53]/40 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4"
                        >
                            {/* Info Details */}
                            <div className="space-y-2 flex-1">
                                {/* Header: Name & Status */}
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h3 className="font-serif font-medium text-base text-[#3D2F24] flex items-center gap-1.5">
                                        <User className="h-4 w-4 text-[#8C6D53]" />
                                        {apply.user.name}
                                    </h3>

                                    {/* Status Badge */}
                                    {apply.status === "pending" && (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                                            <Clock className="h-3 w-3" /> Pending
                                        </span>
                                    )}
                                    {apply.status === "approved" && (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                                            <Check className="h-3 w-3" /> Approved
                                        </span>
                                    )}
                                    {apply.status === "rejected" && (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                                            <X className="h-3 w-3" /> Rejected
                                        </span>
                                    )}
                                </div>

                                {/* Email */}
                                <p className="text-xs text-[#A39281] flex items-center gap-1.5">
                                    <Mail className="h-3.5 w-3.5 text-[#C2B7AC]" />
                                    {apply.user.email}
                                </p>

                                {/* Headline */}
                                <div className="pt-1">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D53] block">
                                        Headline
                                    </span>
                                    <p className="text-xs font-medium text-[#3D2F24]">
                                        {apply.headline}
                                    </p>
                                </div>

                                {/* Bio */}
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D53] block">
                                        Bio
                                    </span>
                                    <p className="text-xs text-[#5C4A3C] leading-relaxed bg-[#FAF7F2] border border-[#E6DFD5] p-3 rounded-lg mt-1">
                                        {apply.bio}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {apply.status === "pending" && (
                                <div className="flex items-center gap-2 pt-2 md:pt-0 shrink-0">
                                    <button
                                        onClick={() => {
                                            setActiveForm(true);
                                            setSelectedId(apply._id);
                                        }}
                                        className="inline-flex items-center gap-1 px-3 py-2 border border-red-200 text-red-700 hover:bg-red-50 text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                        Reject
                                    </button>

                                    <button
                                        disabled={approveLoader}
                                        onClick={() => handleApprove(apply._id)}
                                        className="inline-flex items-center gap-1 px-4 py-2 bg-[#3D2F24] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-md hover:bg-[#2A2018] transition-colors cursor-pointer"
                                    >
                                        {approveLoader ? (<span className="animate-spin"><Loader2 className="h-3 w-3" color="white" /></span>) : (<><Check className="h-3.5 w-3.5" />
                                            Approve</>)}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                    }
                </div >
            ) : (
                // No applications
                <div className="bg-white border border-dashed border-[#E6DFD5] rounded-xl p-10 text-center flex flex-col items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-[#C2B7AC] mb-2" />
                    <h3 className="font-serif italic text-base text-[#6E5D4F] mb-1">
                        No Applications Received
                    </h3>
                    <p className="text-xs text-[#A39281] max-w-xs">
                        There are currently no educator role requests waiting for review.
                    </p>
                </div>
            )
            }
            {activeForm && <RejectionForm id={selectedId} closeForm={setActiveForm} />}
        </div >
    )
}
