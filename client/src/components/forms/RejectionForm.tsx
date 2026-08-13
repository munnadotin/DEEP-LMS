"use client";

import { useRejectApplicationMutation } from "@/redux/features/authApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
    id: string;
    closeForm: any;
};

type FormType = {
    rejectedReason: string;
};

export default function RejectionForm({ id, closeForm }: Props) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormType>();
    const [rejectApplication, { isLoading }] = useRejectApplicationMutation();

    const onSubmit = async (data: FormType) => {
        try {
            const res = await rejectApplication({ id, data }).unwrap();
            toast.success(res.message);
            closeForm(false);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to reject application");
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3D2F24]/40 px-4 backdrop-blur-[2px]">
            <div className="w-full max-w-md rounded-xl border border-[#E6DFD5] bg-[#FAF7F2] p-6 shadow-xl">
                {/* Header */}
                <div className="mb-6 border-b border-[#E6DFD5] pb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6D53]">
                        Application
                    </span>

                    <h2 className="mt-1 text-2xl font-serif font-medium text-[#3D2F24]">
                        Reject Application
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-[#8C6D53]">
                        Please provide a reason for rejecting this application.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label
                            htmlFor="rejectedReason"
                            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#5C4939]"
                        >
                            Rejection Reason
                        </label>

                        <textarea
                            id="rejectedReason"
                            rows={5}
                            placeholder="Enter the reason for rejection..."
                            {...register("rejectedReason", {
                                required: "Rejection reason is required.",
                                minLength: {
                                    value: 10,
                                    message:
                                        "Reason must be at least 10 characters.",
                                },
                                maxLength: {
                                    value: 500,
                                    message:
                                        "Reason cannot exceed 500 characters.",
                                },
                            })}
                            className={`w-full resize-none rounded-lg border bg-[#FDFBF8] px-4 py-3 text-sm text-[#3D2F24] outline-none transition placeholder:text-[#A89583] focus:ring-2 ${errors.rejectedReason
                                ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                                : "border-[#D9CFC3] focus:border-[#8C6D53] focus:ring-[#8C6D53]/10"
                                }`}
                        />

                        {errors.rejectedReason && (
                            <p className="mt-1.5 text-xs text-red-600">
                                {errors.rejectedReason.message}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 border-t border-[#E6DFD5] pt-5">
                        <button
                            type="button"
                            onClick={() => closeForm(false)}
                            disabled={isSubmitting || isLoading}
                            className="rounded-lg border border-[#D9CFC3] px-4 py-2.5 text-sm font-medium text-[#5C4939] transition hover:bg-[#F0EAE2] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            className="rounded-lg bg-[#8C6D53] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#73563F] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting || isLoading ? "Rejecting..." : "Reject Application"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}