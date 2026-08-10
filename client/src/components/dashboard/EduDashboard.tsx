"use client"

import Link from "next/link";
import { useEducatorDashboardQuery } from "@/redux/features/courseApi"
import { BookOpen, Users, CheckCircle2, FileEdit, Clock, TrendingUp, Plus, Eye, ArrowRight, Loader2, } from "lucide-react";

function EduDashboard() {
    const { data, isLoading } = useEducatorDashboardQuery();
    if (!data) return;

    const dashboard = data?.data;

    const formatTotalHours = (seconds: number = 0) => {
        const totalMinutes = Math.floor(seconds / 60);
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;

        return hours > 0 ? `${hours} h ${mins} Min` : `${mins} Min`;
    };

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto p-6 bg-[#FAF7F2] min-h-screen flex flex-col gap-3 items-center justify-center">
                <span className="animate-spin"><Loader2 color="brown" className="h-5 w-5" /></span>
                <p className="font-serif italic text-xs text-[#8C6D53]">Loading dashboard overview...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 lg:p-10 h-screen text-[#3D2F24] tracking-tight space-y-8">
            {/* Header */}
            <div className="flex sm:flex-row sm:items-center border-b border-[#E6DFD5] pb-6">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D53] block mb-1">
                        Overview
                    </span>
                    <h1 className="text-2xl lg:text-3xl font-serif font-medium">Educator Dashboard</h1>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Total Courses */}
                <div className="bg-white border border-[#E6DFD5] p-4 rounded-xl flex flex-col justify-between shadow-sm">
                    <div className="flex items-center justify-between text-[#8C6D53] mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A39281]">
                            Total Courses
                        </span>
                        <BookOpen className="h-4 w-4 text-[#8C6D53]" />
                    </div>
                    <span className="text-2xl font-medium text-[#3D2F24]">
                        {dashboard?.totalCourses ?? 0}
                    </span>
                </div>

                {/* Total Students */}
                <div className="bg-white border border-[#E6DFD5] p-4 rounded-xl flex flex-col justify-between shadow-sm">
                    <div className="flex items-center justify-between text-[#8C6D53] mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A39281]">
                            Total Students
                        </span>
                        <Users className="h-4 w-4 text-[#8C6D53]" />
                    </div>
                    <span className="text-2xl font-medium text-[#3D2F24]">
                        {dashboard?.totalStudents ?? 0}
                    </span>
                </div>

                {/* Published Courses */}
                <div className="bg-white border border-[#E6DFD5] p-4 rounded-xl flex flex-col justify-between shadow-sm">
                    <div className="flex items-center justify-between text-[#8C6D53] mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A39281]">
                            Published
                        </span>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-2xl font-medium text-[#3D2F24]">
                        {dashboard?.publishedCourse ?? 0}
                    </span>
                </div>

                {/* Draft Courses */}
                <div className="bg-white border border-[#E6DFD5] p-4 rounded-xl flex flex-col justify-between shadow-sm">
                    <div className="flex items-center justify-between text-[#8C6D53] mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A39281]">
                            Drafts
                        </span>
                        <FileEdit className="h-4 w-4 text-amber-600" />
                    </div>
                    <span className="text-2xl font-medium text-[#3D2F24]">
                        {dashboard?.draftCoures ?? 0}
                    </span>
                </div>

                {/* Total Duration */}
                <div className="bg-white border border-[#E6DFD5] p-4 rounded-xl flex flex-col justify-between shadow-sm col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between text-[#8C6D53] mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A39281]">
                            Content Length
                        </span>
                        <Clock className="h-4 w-4 text-[#8C6D53]" />
                    </div>
                    <span className="text-2xl font-medium text-[#3D2F24]">
                        {formatTotalHours(dashboard?.totalDuration)}
                    </span>
                </div>
            </div>

            {/* Recent Courses */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-serif font-medium text-[#3D2F24]">Recent Courses</h2>
                    <Link
                        href="/course"
                        className="text-xs font-bold uppercase tracking-wider text-[#8C6D53] hover:text-[#3D2F24] inline-flex items-center gap-1 transition-colors"
                    >
                        View All <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                {dashboard?.recentCourses && dashboard.recentCourses.length > 0 ? (
                    <div className="bg-white border border-[#E6DFD5] rounded-xl overflow-hidden shadow-sm divide-y divide-[#E6DFD5]">
                        {dashboard.recentCourses.map((course) => (
                            <div
                                key={course._id}
                                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF7F2]/50 transition-colors"
                            >
                                {/* Course Details */}
                                <div className="flex items-center gap-3.5">
                                    <div className="w-14 h-10 rounded-md bg-[#E6DFD5] overflow-hidden shrink-0 relative">
                                        {course.thumbnail?.url ? (
                                            <img
                                                src={course.thumbnail.url}
                                                alt={course.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[10px] text-[#A39281] font-serif italic">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-medium text-[#3D2F24] line-clamp-1">
                                            {course.title}
                                        </h3>
                                        <div className="flex items-center gap-3 text-[11px] text-[#A39281] mt-0.5">
                                            <span>{course.level}</span>
                                            <span>•</span>
                                            <span>{course.price === 0 ? "Free" : `$${course.price}`}</span>
                                            <span>•</span>
                                            <span>{course.enrolledStudents.length} students</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 self-end sm:self-center">
                                    <Link
                                        href={`/course/${course.slug}`}
                                        className="px-3 py-1.5 border border-[#E6DFD5] text-[#8C6D53] text-[11px] font-bold uppercase tracking-wider rounded-md hover:bg-[#FAF7F2] transition-colors inline-flex items-center gap-1"
                                    >
                                        <Eye className="h-3 w-3" /> View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="bg-white border border-dashed border-[#E6DFD5] rounded-xl p-8 text-center flex flex-col items-center justify-center">
                        <BookOpen className="h-8 w-8 text-[#C2B7AC] mb-2" />
                        <h3 className="font-serif italic text-sm text-[#6E5D4F] mb-1">
                            No Recent Courses
                        </h3>
                        <p className="text-xs text-[#A39281] max-w-xs mb-4">
                            You haven't created or published any courses yet.
                        </p>
                        <Link
                            href="/course/create-course"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#3D2F24] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-md hover:bg-[#2A2018] transition-colors"
                        >
                            <Plus className="h-3.5 w-3.5" />
                            Create Course
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EduDashboard