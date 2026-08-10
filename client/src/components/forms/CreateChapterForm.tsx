"use client";

import { useForm } from "react-hook-form";
import { useCreateChapterMutation, useUpdateChapterByIdMutation } from "@/redux/features/chapterApi";
import { Dispatch, SetStateAction, useEffect } from "react";
import { AlertCircle, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";

type FormData = {
    _id?: string;
    title: string;
    position: number;
};

type Props = {
    courseId: string;
    setActiveModel: Dispatch<SetStateAction<boolean>>;
    chapter?: FormData;
}

export default function ChapterForm({ courseId, setActiveModel, chapter }: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            title: chapter?.title || "",
            position: chapter?.position || 0,
        }
    });
    const [createChapter, { isLoading }] = useCreateChapterMutation();
    const [updateChapterById, { isLoading: updateLoading }] = useUpdateChapterByIdMutation();

    useEffect(() => {
        if (chapter) {
            reset({
                title: chapter.title,
                position: chapter.position
            })
        }
    }, [chapter, reset]);

    const onSubmit = async (data: FormData) => {
        try {
            if (chapter) {
                const res = await updateChapterById({ courseId, chapterId: chapter._id, data });
                toast.success(res?.data?.message);
                setActiveModel(false);
                reset();
            } else {
                const res = await createChapter({ courseId, data });
                toast.success(res?.data?.message);
                setActiveModel(false);
                reset();
            }
        } catch (error: any) {
            toast.error(error?.data?.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">

            {/* Modal Card */}
            <div className="relative w-full max-w-md bg-[#FAF7F2] border border-[#E6DFD5] rounded-xl p-6 shadow-xl text-[#3D2F24] tracking-tight">

                {/* Close Button */}
                <button
                    type="button"
                    onClick={() => setActiveModel(false)}
                    className="absolute top-4 right-4 p-1.5 text-[#A39281] hover:text-[#3D2F24] transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>

                {/* Modal Header */}
                <div className="border-b border-[#E6DFD5] pb-3 mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D53] block mb-0.5">
                        New Module
                    </span>
                    <h2 className="text-xl font-serif font-medium">Create Chapter</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Title Input */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]">
                            Chapter Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            {...register("title", { required: "Chapter title is required" })}
                            placeholder="e.g. Getting Started with MERN"
                            className="w-full px-3.5 py-2.5 text-xs font-medium bg-white border border-[#E6DFD5] text-[#3D2F24] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] placeholder:text-[#C2B7AC]"
                        />
                        {errors.title && (
                            <p className="text-[11px] text-red-600 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Position Input */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="position" className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]">
                            Position Order
                        </label>
                        <input
                            id="position"
                            type="number"
                            {...register("position", {
                                valueAsNumber: true,
                                required: "Position is required",
                                min: { value: 1, message: "Position must be at least 1" }
                            })}
                            placeholder="Position"
                            className="w-full px-3.5 py-2.5 text-xs font-medium bg-white border border-[#E6DFD5] text-[#3D2F24] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53]"
                        />
                        {errors.position && (
                            <p className="text-[11px] text-red-600 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {errors.position.message}
                            </p>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 border-t border-[#E6DFD5] flex items-center justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveModel(false)}
                            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#A39281] hover:text-[#3D2F24] cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-[#3D2F24] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-md focus:outline-none hover:bg-[#2A2018] transition-colors cursor-pointer"
                        >
                            {isLoading ? <span className="flex items-center justify-center animate-spin"><Loader2 color="brown" className="h-4 w-4" /></span> : chapter ? "Update Chapter" : "Create Chapter"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}