"use client"

import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { Video, X, AlertCircle, Loader2 } from "lucide-react";
import { useCreateLessonMutation, useUpdateLessonByIdMutation } from "@/redux/features/lessonApi";

type Lesson = {
    _id?: string;
    title: string;
    isFree: boolean;
    resources: [string];
    video: {
        _id: string;
        url: string;
    };
}

type LessonForm = {
    title: string;
    isFree: boolean;
    resources: [string];
    video?: FileList;
}

type Props = {
    lesson?: Lesson;
    setActiveModel: Dispatch<SetStateAction<boolean>>;
    courseId: string;
    chapterId: string;
}

export default function LessonForm({ lesson, setActiveModel, courseId, chapterId }: Props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LessonForm>({
        defaultValues: {
            title: lesson?.title || "",
            isFree: lesson?.isFree || false,
            resources: lesson?.resources || [],
        }
    });
    const [createLesson, { isLoading }] = useCreateLessonMutation();
    const [updateLessonById, { isLoading: updateLoader }] = useUpdateLessonByIdMutation();

    useEffect(() => {
        if (lesson) {
            reset({
                title: lesson.title,
                isFree: lesson.isFree,
                resources: lesson.resources
            })
        }
    }, [lesson, reset])

    const onSubmit = async (data: LessonForm) => {
        try {
            if (lesson) {
                // create new lesson
                const res: any = await updateLessonById({ courseId, chapterId, lessonId: lesson._id, data });
                toast.success(res?.data?.message);
                setActiveModel(false);
            } else {
                // create new lesson
                const formData = new FormData();
                formData.append("title", data.title);
                formData.append("isFree", String(data.isFree));
                formData.append("video", data?.video![0])
                const res = await createLesson({ courseId, chapterId, data: formData });
                toast.success(res?.data.message);
                setActiveModel(false);
            }
        } catch (error: any) {
            toast.error(error?.error?.data?.message);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm min-h-screen">
            {/* Modal Container */}
            <div className="relative w-full max-w-md bg-[#FAF7F2] border border-[#E6DFD5] rounded-xl p-6 shadow-xl text-[#3D2F24] tracking-tight">
                {/* Close Button */}
                <button
                    type="button"
                    onClick={() => setActiveModel(false)}
                    className="absolute top-4 right-4 p-1.5 text-[#A39281] hover:text-[#3D2F24] transition-colors cursor-pointer"
                >
                    <X className="h-4 w-4" />
                </button>

                {/* Modal Header */}
                <div className="border-b border-[#E6DFD5] pb-3 mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D53] block mb-0.5">
                        Lesson Management
                    </span>
                    <h2 className="text-xl font-serif font-medium">
                        {lesson ? "Edit Lesson" : "Create Lesson"}
                    </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Title Field */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]">
                            Lesson Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            placeholder="e.g. Introduction to Espresso Extraction"
                            {...register("title", { required: "Lesson title is required" })}
                            className="w-full px-3.5 py-2.5 text-xs font-medium bg-white border border-[#E6DFD5] text-[#3D2F24] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] placeholder:text-[#C2B7AC]"
                        />
                        {errors.title && (
                            <p className="text-[11px] text-red-600 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Video Field */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="video" className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]">
                            Video URL
                        </label>
                        {lesson && lesson.video.url ? (<video src={lesson.video.url} controls />) : (
                            <div className="relative">
                                <input
                                    id="video"
                                    type="file"
                                    accept=".mp4"
                                    {...register("video", { required: "Video URL is required" })}
                                    className="w-full pl-9 pr-3.5 py-2.5 text-xs font-medium bg-white border border-[#E6DFD5] text-[#3D2F24] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] placeholder:text-[#C2B7AC]"
                                />
                                <Video className="absolute left-3 top-2.5 h-4 w-4 text-[#C2B7AC]" />
                                {errors.video && (
                                    <p className="text-[11px] text-red-600 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> {errors.video.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Is Free Checkbox */}
                    <div className="bg-white border border-[#E6DFD5] p-3 rounded-lg flex items-center justify-between">
                        <label htmlFor="isFree" className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C] cursor-pointer">
                            Free Preview
                        </label>
                        <input
                            id="isFree"
                            type="checkbox"
                            {...register("isFree")}
                            className="h-4 w-4 rounded border-[#E6DFD5] text-[#8C6D53] focus:ring-[#8C6D53] cursor-pointer accent-[#8C6D53]"
                        />
                    </div>

                    {/* Action Buttons */}
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
                            className="px-5 py-2.5 bg-[#3D2F24] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-md hover:bg-[#2A2018] focus:outline-none transition-colors cursor-pointer"
                        >
                            {lesson ? (updateLoader ? <span className="flex items-center justify-center animate-spin"><Loader2 color="white" className="h-5 w-5" /></span> : "Update Lesson") : (isLoading ? <span className="flex items-center justify-center animate-spin"><Loader2 color="white" className="h-5 w-5" /></span> : "Create Lesson")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
