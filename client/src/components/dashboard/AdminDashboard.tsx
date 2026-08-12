"use client";

import { useAdminDashboardQuery } from "@/redux/features/courseApi";
import Loader from "../ui/Loader";
import { Users, GraduationCap, BookOpen, DollarSign, UserCheck, CheckCircle } from "lucide-react";
import { useGetApplicationsQuery } from "@/redux/features/authApi";

export default function AdminDashboard() {
    const { data, isLoading } = useAdminDashboardQuery();
    const { data: application } = useGetApplicationsQuery();

    if (isLoading) {
        return <Loader />;
    }
console.log(application)
    const dashboard = data?.dashboard;

    const stats = [
        { label: "Total Students", value: dashboard?.totalStudents ?? 0, icon: Users },
        { label: "Total Educators", value: dashboard?.totalEducators ?? 0, icon: GraduationCap },
        { label: "Total Courses", value: dashboard?.totalCourses ?? 0, icon: BookOpen },
        { label: "Total Revenue", value: `$${dashboard?.revenue?.totalRevenue ?? 0}`, icon: DollarSign },
        { label: "Total Enrollments", value: dashboard?.totalEnrollments ?? 0, icon: CheckCircle },
        { label: "Pending Applications", value: dashboard?.pendingEducatorApplications ?? 0, icon: UserCheck },
    ];

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen text-[#3D2F24]">
            <div className="border-b border-[#E6DFD5] pb-4 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D53]">Overview</span>
                <h1 className="text-2xl font-serif font-medium">Admin Dashboard</h1>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white border border-[#E6DFD5] p-5 rounded-xl shadow-sm flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A39281] block mb-1">
                                    {stat.label}
                                </span>
                                <span className="text-2xl font-serif font-medium text-[#3D2F24]">
                                    {stat.value}
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] flex items-center justify-center text-[#8C6D53]">
                                <Icon className="h-5 w-5" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Applications */}
            <div className="border-b border-[#E6DFD5] pt-4 mt-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D53]">Overview</span>
                <h1 className="text-2xl font-serif font-medium">Admin Dashboard</h1>
            </div>
        </div>
    );
}