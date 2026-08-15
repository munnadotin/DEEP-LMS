"use client";

import Link from "next/link";
import { Plus, Edit3, Trash2, Eye, Users, Star, Clock, } from "lucide-react";
import { useDeleteCourseBySlugMutation, useGetAllCourseByEducatorQuery } from "@/redux/features/courseApi";
import Loader from "../ui/Loader";
import toast from "react-hot-toast";

export default function MyCourse() {
    const { data, isLoading } = useGetAllCourseByEducatorQuery();
    const [deleteCourseBySlug] = useDeleteCourseBySlugMutation();

    const courses = data?.courses;

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteCourseBySlug(id).unwrap();
            console.log(res);
            toast.success(res?.message);
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete course");
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div className="max-w-6xl mx-auto p-6 lg:p-10 min-h-screen text-[#3D2F24] tracking-tight">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DFD5] pb-6 mb-8">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D53] block mb-1">
                        Educator Dashboard
                    </span>
                    <h1 className="text-2xl lg:text-3xl font-serif font-medium">My Courses</h1>
                    <p className="text-xs text-[#A39281] mt-1">
                        Manage your published courses, curriculum details, and enrollment.
                    </p>
                </div>

                <Link
                    href="/educator/create-course"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#3D2F24] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-md hover:bg-[#2A2018] transition-colors shrink-0"
                >
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                    Create New Course
                </Link>
            </div>

            {/* Course Grid */}
            {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course: any) => (
                        <div
                            key={course._id}
                            className="bg-white border border-[#E6DFD5] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#8C6D53]/50 transition-colors shadow-sm"
                        >
                            {/* Thumbnail Header */}
                            <div className="relative w-full h-44 bg-[#E6DFD5] overflow-hidden">
                                {course.thumbnail?.url ? (
                                    <img
                                        src={course.thumbnail.url}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#A39281] font-serif italic text-xs">
                                        No Thumbnail
                                    </div>
                                )}

                                {/* Price & Level Badges */}
                                <span className="absolute top-3 left-3 bg-[#3D2F24]/90 text-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                                    {course.price === 0 ? "Free" : `₹${course.price}`}
                                </span>

                                <span className="absolute top-3 right-3 bg-white/90 text-[#5C4A3C] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-[#E6DFD5]">
                                    {course.level}
                                </span>
                            </div>

                            {/* Content Body */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-serif font-medium text-base text-[#3D2F24] line-clamp-1 mb-1">
                                        {course.title}
                                    </h3>
                                    <p className="text-xs text-[#A39281] line-clamp-2 mb-4">
                                        {course.description}
                                    </p>
                                </div>

                                {/* Course Metadata Stats */}
                                <div className="pt-3 border-t border-[#E6DFD5] flex items-center justify-between text-[11px] text-[#8C6D53]">
                                    <span className="flex items-center gap-1">
                                        <Users className="h-3.5 w-3.5 text-[#C2B7AC]" />
                                        {course.students} {course.students === 1 ? "Student" : "Students"}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <Star className="h-3.5 w-3.5 text-amber-600 fill-amber-500" />
                                        {course.rating ? course.rating.toFixed(1) : "N/A"}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5 text-[#C2B7AC]" />
                                        {course.duration}m
                                    </span>
                                </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="px-5 py-3.5 bg-[#FAF7F2] border-t border-[#E6DFD5] flex items-center justify-between">
                                {/* View Course */}
                                <Link
                                    href={`/course/${course.slug}`}
                                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#8C6D53] hover:text-[#3D2F24] transition-colors"
                                >
                                    <Eye className="h-3.5 w-3.5" />
                                    View
                                </Link>

                                <div className="flex items-center gap-2">
                                    {/* Edit Course */}
                                    <Link
                                        href={`/educator/create-course/${course._id}`}
                                        className="p-1.5 text-[#A39281] hover:text-[#3D2F24] transition-colors"
                                        title="Edit Course"
                                    >
                                        <Edit3 className="h-4 w-4" />
                                    </Link>

                                    {/* Delete Course */}
                                    <button
                                        onClick={() => handleDelete(course._id)}
                                        className="p-1.5 text-[#A39281] hover:text-red-600 transition-colors cursor-pointer"
                                        title="Delete Course"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="bg-white border border-dashed border-[#E6DFD5] rounded-xl p-12 text-center flex flex-col items-center justify-center">
                    <h3 className="font-serif italic text-base text-[#6E5D4F] mb-1">
                        No Courses Found
                    </h3>
                </div>
            )}
        </div>
    );
}