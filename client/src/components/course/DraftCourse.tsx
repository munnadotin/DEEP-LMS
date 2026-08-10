"use client"

import { BookOpen, Send, Clock, Trash2 } from 'lucide-react';
import { useDeleteCourseBySlugMutation, useGetAllDraftCourseQuery } from "@/redux/features/courseApi"
import { Course } from '@/types/Course.type';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function DraftCourse() {
    const { data, isLoading } = useGetAllDraftCourseQuery();
    const [deleteCourseBySlug, { data: response, isLoading: deleteLoading }] = useDeleteCourseBySlugMutation();
    const router = useRouter();

    if (isLoading || deleteLoading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <p className="font-serif italic text-base text-[#6E5D4F]">Loading draft collection...</p>
            </div>
        );
    }

    return (
        <div className="text-[#3D2F24] tracking-tight">
            <main className="max-w-7xl mx-auto pt-6">
                {data?.courses && data?.courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data?.courses.map((course: Course) => (
                            <div
                                key={course._id}
                                className="bg-white border border-[#E6DFD5] rounded-xl overflow-hidden flex flex-col justify-between h-full"
                            >
                                <div>
                                    {/* Thumbnail */}
                                    <div className="relative aspect-16/10 bg-[#FAF7F2] border-b border-[#E6DFD5] overflow-hidden">
                                        {course.thumbnail?.url ? (
                                            <img
                                                src={course.thumbnail.url}
                                                alt={course.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <BookOpen className="h-10 w-10 text-[#C2B7AC]" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/95 border border-[#E6DFD5] text-[9px] font-bold uppercase tracking-widest text-[#8C6D53]">
                                            Unpublished
                                        </div>
                                    </div>

                                    {/* Body Details */}
                                    <div className="p-6 space-y-3">
                                        <div className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-[#A39281]">
                                            <span>{course.level || "Beginner"} Tier</span>
                                            <span className="font-serif font-semibold text-sm text-[#3D2F24] lowercase">
                                                ${course.price}
                                            </span>
                                        </div>

                                        <h3 className="font-serif font-medium text-lg text-[#3D2F24] line-clamp-1">
                                            {course.title}
                                        </h3>

                                        <p className="text-xs text-[#6E5D4F] line-clamp-2 leading-relaxed">
                                            {course.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="p-6 pt-0 space-y-2">
                                    <button
                                        onClick={() => router.push(`/educator/create-course/${course._id}`)}
                                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#3D2F24] text-[#FAF7F2] text-xs font-bold uppercase tracking-widest rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C6D53] cursor-pointer"
                                    >
                                        <Send className="h-3.5 w-3.5" />
                                        Add Chapters
                                    </button>
                                    <button
                                        onClick={() => {
                                            deleteCourseBySlug(course._id);
                                            toast.success("Course Delete");
                                        }}
                                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-[#3D2F24] bg-[#FAF7F2] text-xs font-bold uppercase tracking-widest rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C6D53] cursor-pointer"
                                    >
                                        <Trash2 className='h-3.5 w-3.5' />
                                        Delete Course
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="w-full border border-dashed border-[#E6DFD5] rounded-xl p-16 text-center bg-white">
                        <Clock className="h-10 w-10 text-[#C2B7AC] mx-auto mb-3" />
                        <h2 className="font-serif italic text-lg text-[#6E5D4F]">No Drafts Found</h2>
                        <p className="text-xs text-[#A39281] mt-1 uppercase tracking-wider">
                            You don't have any pending drafts awaiting publication.
                        </p>
                    </div>
                )}
            </main>
        </div>
    )
}

export default DraftCourse