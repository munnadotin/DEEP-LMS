"use client"

import { useDeleteLessonByIdMutation, useGetAllLessonsQuery } from "@/redux/features/lessonApi"
import { Clock, FileText, Lock, PlayCircle, Plus, Rocket, Sparkles, SquarePen, Trash2, Video } from "lucide-react";
import { useState } from "react";
import LessonForm from "../forms/LessonForm";
import { Lesson } from "@/types/Course.type";
import { useUpdateCourseByIdMutation } from "@/redux/features/courseApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
    courseId: string;
    chapterId: string;
}

export default function LessonList({ courseId, chapterId }: Props) {
    const { data, isLoading } = useGetAllLessonsQuery({ courseId, chapterId });
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [activeModel, setActiveModel] = useState(false);
    const [deleteLessonById] = useDeleteLessonByIdMutation();
    const [updateCourseById, { isLoading: postLoader }] = useUpdateCourseByIdMutation();
    const router = useRouter();

    const lessons = data?.lessons || [];
    const hasLessons = lessons.length > 0;

    const formatDuration = (seconds: number = 0) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleSubmit = () => {
        try {
            const res: any = updateCourseById({
                courseId, data: { published: "published" }
            }).unwrap();
            toast.success("Course posted successfully.");
            router.push("/");
        } catch (error: any) {
            toast.error(error?.error?.data?.message || "An error occurred while posting the course.");
        }
    }

    if (isLoading || postLoader) {
        return (
            <div className="p-6 bg-[#FAF7F2] rounded-xl border border-[#E6DFD5] text-center">
                <p className="font-serif italic text-xs text-[#8C6D53]">Loading chapter lessons...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 text-[#3D2F24] rounded-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E6DFD5] pb-4 mb-6">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D53] block mb-0.5">
                        Module Content
                    </span>
                    <h3 className="text-lg font-serif font-medium">Lessons</h3>
                </div>

                {hasLessons && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                setActiveModel(true);
                                setSelectedLesson(null);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#3D2F24] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-md hover:bg-[#2A2018] transition-colors cursor-pointer"
                        >
                            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                            Add Lesson
                        </button>
                        <button
                            onClick={() => handleSubmit()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[#3D2F24] bg-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-md hover:bg-[#2A2018]/20 border-2 border-[#2A2018]/40 transition-colors cursor-pointer"
                        >
                            <Rocket strokeWidth={1.5} className="h-3.5 w-3.5" />
                            Post Course
                        </button>
                    </div>
                )}
            </div>

            {/* Lesson List Items */}
            {hasLessons ? (
                <div className="space-y-3">
                    {lessons.map((lesson, index) => (
                        <div
                            key={lesson._id}
                            className="bg-white border border-[#E6DFD5] p-4 rounded-lg flex items-center justify-between transition-colors hover:border-[#8C6D53]/40"
                        >
                            {/* Left Side: Index & Information */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E6DFD5] flex items-center justify-center text-xs font-bold text-[#8C6D53] shrink-0">
                                    {index + 1}
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-xs font-medium text-[#3D2F24] line-clamp-1">
                                            {lesson.title}
                                        </h4>
                                        {lesson.isFree ? (
                                            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                                                <Sparkles className="h-2.5 w-2.5" /> Free Preview
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#A39281] bg-[#FAF7F2] border border-[#E6DFD5] px-1.5 py-0.5 rounded">
                                                <Lock className="h-2.5 w-2.5" /> Locked
                                            </span>
                                        )}
                                    </div>

                                    {/* Metadata Indicators */}
                                    <div className="flex items-center gap-3 text-[11px] text-[#A39281]">
                                        {/* Duration */}
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3 text-[#C2B7AC]" />
                                            {formatDuration(lesson.duration)}
                                        </span>

                                        {/* Video Attachment Indicator */}
                                        {lesson.video?.url && (
                                            <span className="flex items-center gap-1 text-[#8C6D53]">
                                                <Video className="h-3 w-3" /> Video Attached
                                            </span>
                                        )}

                                        {/* Resource Count */}
                                        {lesson.resources && lesson.resources.length > 0 && (
                                            <span className="flex items-center gap-1 text-[#6E5D4F]">
                                                <FileText className="h-3 w-3" />
                                                {lesson.resources.length}{" "}
                                                {lesson.resources.length === 1 ? "Resource" : "Resources"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="flex items-center justify-center gap-3">
                                <button onClick={() => deleteLessonById({ courseId, chapterId, lessonId: lesson._id })} className="cursor-pointer"><Trash2 strokeWidth={1.5} color="red" className="h-4 w-4" /></button>
                                <button onClick={() => {
                                    setSelectedLesson(lesson);
                                    setActiveModel(true);
                                }} className="cursor-pointer"><SquarePen strokeWidth={1.5} color="brown" className="h-4 w-4" /></button>
                                {lesson.video?.url && (
                                    <a
                                        href={lesson.video.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[#A39281] hover:text-[#3D2F24] transition-colors inline-block"
                                        title="Watch Video"
                                    >
                                        <PlayCircle strokeWidth={1.5} className="h-5 w-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="bg-white border border-dashed border-[#E6DFD5] rounded-lg p-8 text-center flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E6DFD5] flex items-center justify-center mb-2">
                        <Video className="h-4 w-4 text-[#C2B7AC]" />
                    </div>

                    <h4 className="font-serif italic text-sm text-[#6E5D4F] mb-1">
                        No Lessons in This Chapter
                    </h4>
                    <p className="text-xs text-[#A39281] max-w-xs mb-5">
                        Add your first video lecture or lesson material to build this chapter.
                    </p>

                    <button
                        onClick={() => {
                            setActiveModel(true);
                            setSelectedLesson(null);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#3D2F24] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-md hover:bg-[#2A2018] transition-colors cursor-pointer"
                    >
                        <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                        Add First Lesson
                    </button>
                </div>
            )}
            {activeModel && <LessonForm lesson={selectedLesson!} setActiveModel={setActiveModel} courseId={courseId} chapterId={chapterId} />}
        </div>
    )
}
