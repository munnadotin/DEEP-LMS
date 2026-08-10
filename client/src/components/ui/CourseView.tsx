"use client"

import { useUpdateProgressMutation } from "@/redux/features/enrollApi";
import { Lesson } from "@/types/Course.type"
import { Enrollment } from "@/types/Enroll.type";
import { Calendar, CheckLine, Clock, FileText, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
    setViewCourse: React.Dispatch<React.SetStateAction<boolean>>,
    courseLesson: Lesson,
    courseId: string;
    lessonId: string;
    enrollment?: Enrollment | undefined;
}

function CourseView({ setViewCourse, courseLesson, courseId, lessonId, enrollment }: Props) {
    const [updateProgress, { isLoading }] = useUpdateProgressMutation();
    
    const handleProgress = async (courseId: string, lessonId: string) => {
        if (!enrollment) return;

        try {
            const res = await updateProgress({ courseId, lessonId }).unwrap();
            toast.success(res?.message);
        } catch (error: any) {
            toast.error(error?.data.message);
            console.error(error?.data.message);
        }
    }

    return (
        <div
            onClick={() => setViewCourse(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
            {/* Modal Container */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#FAF7F2] w-full max-w-5xl max-h-[95vh] rounded-xl flex flex-col text-[#3D2F24] tracking-tight shadow-2xl border border-[#E6DFD5] overflow-hidden"
            >
                {/* Header */}
                <nav className="h-14 border-b border-[#E6DFD5] bg-white px-4 flex items-center justify-between shrink-0">
                    {isLoading ? <div className="flex gap-1 items-center justify-center ">
                        <span className="animate-spin"><Loader2 className="h-4 w-4" /></span>
                        <p className="text-xs">wait for updating progress...</p>
                    </div> : enrollment ? (
                        <button
                            onClick={() => handleProgress(courseId, lessonId)}
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#127226] hover:text-[#3D2F24] transition-colors focus:outline-none cursor-pointer"
                        >
                            {enrollment.completedLessons.includes(courseLesson._id) ? (
                                <span>Completed</span>
                            ) : (
                                <>
                                    <CheckLine className="h-5 w-5" strokeWidth={1.5} />
                                    <span className="hidden sm:inline">Mark as complete</span>
                                </>
                            )}
                        </button>
                    ) : (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#A39281]">
                            Preview mode
                        </span>
                    )}

                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#A39281]">
                            {courseLesson.isFree ? "Preview" : "Premium"}
                        </span>
                        <span className="text-[10px] font-medium text-[#8C6D53] bg-[#FAF7F2] border border-[#E6DFD5] px-2 py-0.5 rounded">
                            {courseLesson.isFree ? "Free Tier" : "Member Access"}
                        </span>
                        <button
                            onClick={() => setViewCourse(false)}
                            className="ml-2 p-1 rounded hover:bg-[#E6DFD5] transition-colors"
                        >
                            <X className="h-4 w-4 text-[#8C6D53]" />
                        </button>
                    </div>
                </nav>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5 lg:p-8 space-y-6">
                    {/* Video Player */}
                    <div className="relative aspect-video w-full bg-[#3D2F24] border border-[#E6DFD5] rounded-lg overflow-hidden">
                        {courseLesson.video?.url && (
                            <video
                                key={courseLesson._id}
                                src={courseLesson.video.url}
                                controls
                                controlsList="nodownload"
                                className="w-full h-full object-contain"
                            />
                        )}
                    </div>

                    {/* Lesson Info */}
                    <div className="border-b border-[#E6DFD5] pb-4 space-y-2">
                        <h1 className="text-xl lg:text-2xl font-serif font-medium text-[#3D2F24] leading-tight">
                            {courseLesson.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#A39281] font-medium tracking-wider uppercase">
                            <span className="inline-flex items-center gap-1 text-[#8C6D53]">
                                <Clock className="h-3.5 w-3.5" />  {Math.floor(courseLesson.duration / 60)} min {courseLesson.duration % 60} sec
                            </span>
                            <span className="hidden sm:inline w-1 h-1 rounded-full bg-[#E6DFD5]" />
                            <span className="inline-flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" /> {new Date(courseLesson.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="space-y-3">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#8C6D53]">
                            Resources & Materials
                        </h2>

                        {courseLesson.resources && courseLesson.resources.length > 0 ? (
                            <div className="grid gap-2">
                                {courseLesson.resources.map((resource, index) => (
                                    <a
                                        key={index}
                                        href={resource}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-md text-xs font-medium text-[#3D2F24] hover:border-[#8C6D53] transition-colors"
                                    >
                                        <FileText className="h-4 w-4 text-[#8C6D53] shrink-0" />
                                        <span className="truncate">
                                            {resource.split('/').pop() || resource}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="p-4 bg-white border border-[#E6DFD5] rounded-md text-center">
                                <p className="text-xs italic text-[#A39281]">
                                    No resources available for this lesson
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CourseView;