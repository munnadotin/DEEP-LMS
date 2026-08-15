"use client";

import { useGetUsersQuery } from "@/redux/features/authApi";
import Loader from "./Loader";
import { UserCheck, Shield, Mail, CheckCircle, XCircle, RotateCcw, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

type UserFilterForm = {
    search: string;
    role: "" | "admin" | "educator" | "user";
    verification: "" | "verified" | "unverified";
};

export default function AdminUser() {
    const { register, handleSubmit, reset } = useForm<UserFilterForm>({
        defaultValues: {
            search: "",
            role: "",
            verification: "",
        },
    });

    const [filters, setFilters] = useState({});

    const { data, isLoading } = useGetUsersQuery(filters);

    const onSubmit = (values: UserFilterForm) => {
        const params = {
            ...(values.search && { search: values.search }),
            ...(values.role && { role: values.role }),
            ...(values.verification && {
                isVerified: values.verification === "verified",
            }),
        };
        setFilters(params);
    };

    const handleReset = () => {
        reset();
        setFilters({});
    };

    if (isLoading) {
        return <Loader />;
    }

    const users = data?.users || [];

    return (
        <div className="max-w-6xl mx-auto p-6 bg-[#FAF7F2] text-[#3D2F24] tracking-tight min-h-screen">
            {/* Header */}
            <div className="border-b border-[#E6DFD5] pb-4 mb-6 flex items-center justify-between">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D53] block mb-1">
                        User Management
                    </span>
                    <h1 className="text-2xl font-serif font-medium">All Platform Users</h1>
                </div>
                <div className="text-xs font-semibold bg-white border border-[#E6DFD5] px-3 py-1.5 rounded-md text-[#5C4A3C]">
                    Total Users: {users.length}
                </div>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mb-4 rounded-xl border border-[#E6DFD5] bg-white p-4"
            >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end">

                    {/* Search */}
                    <div className="flex-1">
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[#8C6D53]">
                            Search
                        </label>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A39281]" />

                            <input
                                {...register("search")}
                                type="text"
                                placeholder="Search by name, email or user ID..."
                                className="h-10 w-full rounded-lg border border-[#E6DFD5] bg-[#FAF7F2] pl-9 pr-3 text-xs text-[#3D2F24] outline-none transition focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53]"
                            />
                        </div>
                    </div>

                    {/* Role */}
                    <div className="w-full lg:w-40">
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[#8C6D53]">
                            Role
                        </label>

                        <select
                            {...register("role")}
                            className="h-10 w-full rounded-lg border border-[#E6DFD5] bg-[#FAF7F2] px-3 text-xs text-[#3D2F24] outline-none focus:border-[#8C6D53] cursor-pointer"
                        >
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="educator">Educator</option>
                            <option value="student">Student</option>
                        </select>
                    </div>

                    {/* Verification */}
                    <div className="w-full lg:w-40">
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[#8C6D53]">
                            Verification
                        </label>

                        <select
                            {...register("verification")}
                            className="h-10 w-full rounded-lg border border-[#E6DFD5] bg-[#FAF7F2] px-3 text-xs text-[#3D2F24] outline-none focus:border-[#8C6D53] cursor-pointer"
                        >
                            <option value="">All</option>
                            <option value="verified">Verified</option>
                            <option value="unverified">Unverified</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#3D2F24] px-4 text-xs font-bold text-white transition hover:bg-[#5C4A3C] cursor-pointer"
                        >
                            <Search className="h-3.5 w-3.5" />
                            Search
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E6DFD5] bg-white px-4 text-xs font-bold text-[#8C6D53] transition hover:bg-[#FAF7F2] cursor-pointer"
                        >
                            <RotateCcw className="h-3.5 w-3.5" />
                            Reset
                        </button>
                    </div>
                </div>
            </form>

            {/* Users Table */}
            <div className="bg-white border border-[#E6DFD5] rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">

                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#FAF7F2] border-b border-[#E6DFD5] text-[10px] font-bold uppercase tracking-wider text-[#8C6D53]">
                                <th className="py-3 px-4">User</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Role</th>
                                <th className="py-3 px-4">Verification</th>
                                <th className="py-3 px-4 text-right">User ID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E6DFD5] text-xs">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                                    {/* Name */}
                                    <td className="py-3.5 px-4 font-medium text-[#3D2F24] flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#E6DFD5] flex items-center justify-center text-[#8C6D53] shrink-0 font-bold text-xs">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <span>{user.name}</span>
                                    </td>

                                    {/* Email */}
                                    <td className="py-3.5 px-4 text-[#5C4A3C]">
                                        <div className="flex items-center gap-1.5">
                                            <Mail className="h-3.5 w-3.5 text-[#C2B7AC]" />
                                            {user.email}
                                        </div>
                                    </td>

                                    {/* Role */}
                                    <td className="py-3.5 px-4">
                                        <span
                                            className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${user.role === "admin"
                                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                                : user.role === "educator"
                                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                                    : "bg-stone-100 text-stone-700 border-stone-200"
                                                }`}
                                        >
                                            {user.role === "admin" ? (
                                                <Shield className="h-3 w-3" />
                                            ) : (
                                                <UserCheck className="h-3 w-3" />
                                            )}
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* Verification Status */}
                                    <td className="py-3.5 px-4">
                                        {user.isVerified ? (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                                                <CheckCircle className="h-3 w-3" /> Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                                                <XCircle className="h-3 w-3" /> Unverified
                                            </span>
                                        )}
                                    </td>

                                    {/* User ID */}
                                    <td className="py-3.5 px-4 text-right font-mono text-[11px] text-[#A39281]">
                                        {user._id}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="p-8 text-center text-xs text-[#A39281] font-serif italic">
                        No users registered yet.
                    </div>
                )}
            </div>
        </div>
    );
}