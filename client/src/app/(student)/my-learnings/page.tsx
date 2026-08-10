"use client"

import Link from 'next/link';
import { useGetAllEnrollmentsQuery } from "@/redux/features/enrollApi"
import { BookOpen, Award, CheckCircle2, Play, AlertCircle } from 'lucide-react';
import { Enrollment } from '@/types/Enroll.type';
import CourseLoader from '@/components/ui/CourseLoader';

export default function page() {
    const { data, isLoading } = useGetAllEnrollmentsQuery();

    return (
        <div className="bg-[#FAF7F2] min-h-screen tracking-tight text-[#3D2F24] pb-20">
            {/*  Header */}
            <header className="border-b border-[#E6DFD5] bg-white py-12">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <span className="text-xs font-semibold tracking-widest text-[#8C6D53] uppercase block mb-2">
                        Student Workspace
                    </span>
                    <h1 className="text-3xl font-medium">My Enrollments</h1>
                    <p className="text-xs text-[#A39281] mt-1 font-normal">
                        Track your educational paths, view progress metrics, and resume active seminars.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
                {isLoading ? <CourseLoader /> : (data?.data && data?.data.length > 0) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data?.data.map((enrollment: Enrollment) => {
                            const isCompleted = enrollment.progress === 100;

                            return (
                                <div
                                    key={enrollment._id}
                                    className="bg-white border border-[#E6DFD5] rounded-xl overflow-hidden flex flex-col h-full justify-between"
                                >
                                    <div>
                                        {/* Image */}
                                        <div className="relative aspect-video bg-[#FAF7F2] border-b border-[#E6DFD5] overflow-hidden">
                                            {enrollment.course?.thumbnail?.url ? (
                                                <img
                                                    src={enrollment.course.thumbnail.url}
                                                    alt={enrollment.course.title}
                                                    className="w-full h-full object-cover grayscale-20"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <BookOpen className="h-10 w-10 text-[#C2B7AC]" />
                                                </div>
                                            )}

                                            {/* Status Tag */}
                                            <div className="absolute top-3 right-3 px-2 py-1 bg-white/95 border border-[#E6DFD5] text-[9px] font-bold uppercase tracking-widest text-[#8C6D53]">
                                                {enrollment.paymentStatus === 'paid' ? "Verified Seat" : "Pending Order"}
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-6 space-y-4">
                                            <div className="space-y-1">
                                                <h3 className="font-serif font-medium text-lg text-[#3D2F24] line-clamp-1">
                                                    {enrollment.course?.title}
                                                </h3>
                                                <p className="text-xs text-[#6E5D4F] line-clamp-2 leading-relaxed">
                                                    {enrollment.course?.description}
                                                </p>
                                            </div>

                                            {/*  Progress Bar */}
                                            <div className="space-y-2 pt-1">
                                                <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase">
                                                    <span className="text-[#A39281]">Syllabus Progress</span>
                                                    <span className="text-[#3D2F24] font-serif font-bold">{enrollment.progress}%</span>
                                                </div>
                                                {/* progress */}
                                                <div className="w-full h-1 bg-[#FAF7F2] border border-[#E6DFD5]/70 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#8C6D53] transition-all duration-300"
                                                        style={{ width: `${enrollment.progress}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Last Completed Lesson */}
                                            {enrollment.lastLessonCompleted && (
                                                <div className="p-3 bg-[#FAF7F2] border border-[#E6DFD5] rounded-lg flex gap-2.5 items-start">
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-[#8C6D53] mt-0.5 shrink-0" />
                                                    <div className="min-w-0">
                                                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#A39281] block">
                                                            Last Completed Session
                                                        </span>
                                                        <p className="text-xs text-[#3D2F24] font-medium truncate mt-0.5">
                                                            {enrollment.lastLessonCompleted.title}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <div className="px-6 pb-6 pt-2">
                                        <Link
                                            href={`/course/${enrollment.course?.slug}`}
                                            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#3D2F24] text-[#FAF7F2] text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
                                        >
                                            {isCompleted ? (
                                                <>
                                                    <Award className="h-4 w-4 text-[#FAF7F2]" />
                                                    Review Full Course
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="h-3.5 w-3.5 fill-[#FAF7F2] text-[#FAF7F2]" />
                                                    Resume Learning
                                                </>
                                            )}
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="w-full border border-dashed border-[#E6DFD5] rounded-xl p-16 text-center bg-white">
                        <AlertCircle className="h-10 w-10 text-[#C2B7AC] mx-auto mb-4" />
                        <h2 className="font-serif italic text-lg text-[#6E5D4F]">No Active Learning Paths</h2>
                        <p className="text-xs text-[#A39281] mt-2 uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                            You have not committed to any premium catalogs yet. Visit our main collective platform to begin.
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/course"
                                className="inline-flex items-center py-3 px-6 bg-[#3D2F24] text-[#FAF7F2] text-xs font-bold uppercase tracking-widest rounded-md"
                            >
                                Explore Catalog
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
