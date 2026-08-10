"use client";

import { useSearchQuery } from "@/redux/features/searchApi";
import { useState } from "react";
import CourseCard from "./CourseCard";
import CourseLoader from "../ui/CourseLoader";
import { ChevronDown } from "lucide-react";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function CourseList() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { data: categories } = useGetCategoryQuery();

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const level = searchParams.get("level") || "";
    const sort = searchParams.get("sort") || "";
    const page = Number(searchParams.get("page")) || 1;
    const limit = 6;

    const { data, isLoading } = useSearchQuery({
        search, category, level, sort, page, limit
    });

    const updateQuery = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value)
            params.set(key, value);
        else
            params.delete(key);

        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
    };

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete("category");
        params.delete("level");
        params.delete("sort");
        params.delete("page");

        router.push(`${pathname}?${params.toString()}`);
    };

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", String(newPage));

        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="bg-[#FAF7F2] min-h-screen tracking-tight text-[#3D2F24]">
            {/* Sub-Header Area */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-6 border-b border-[#E6DFD5]">
                <span className="text-xs font-semibold tracking-widest text-[#8C6D53] uppercase block mb-2">
                    Curated Collection
                </span>
                <h1 className="text-3xl font-serif font-medium">Explore All Courses</h1>
            </div>

            {/* Layout Container */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">

                    {/* Filter Control Panel */}
                    <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-8 bg-white border border-[#E6DFD5] p-6 rounded-xl">
                        <div className="pb-4 border-b border-[#E6DFD5] flex items-center justify-between">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#3D2F24]">
                                Refine By
                            </h2>
                            <button suppressHydrationWarning onClick={() => clearFilters()} className="text-[10px] uppercase font-semibold tracking-wider text-[#8C6D53] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E6DFD5] cursor-pointer">
                                Clear Filters
                            </button>
                        </div>

                        {/* Category */}
                        <div className="flex flex-col gap-2.5">
                            <label
                                htmlFor="sort"
                                className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]"
                            >
                                Category
                            </label>

                            <div className="flex flex-col gap-2">
                                {categories?.categories.map((cat) => (
                                    <label
                                        key={cat._id}
                                        htmlFor={cat.slug}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            checked={category === cat.slug}
                                            onChange={() => updateQuery("category", cat.slug)}
                                            id={cat.slug}
                                            name="category"
                                            value={cat.slug}
                                        />
                                        <span className="text-xs">{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="flex flex-col gap-2.5">
                            <label htmlFor="sort" className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]">
                                Sort Sequence
                            </label>
                            <div className="relative">
                                <select
                                    id="sort"
                                    value={sort}
                                    onChange={(e) => updateQuery("sort", e.target.value)}
                                    className="w-full px-3 py-2.5 text-xs font-medium bg-white border border-[#E6DFD5] text-[#3D2F24] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] appearance-none transition-colors"
                                >
                                    <option value="newest">Newest Releases</option>
                                    <option value="oldest">Archived First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8C6D53]">
                                    <ChevronDown className="h-3.5 w-3.5" />
                                </div>
                            </div>
                        </div>

                        {/* Level Filter */}
                        <div className="flex flex-col gap-2.5">
                            <label htmlFor="level" className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]">
                                Experience Level
                            </label>
                            <div className="relative">
                                <select
                                    id="level"
                                    value={level}
                                    onChange={(e) => updateQuery("level", e.target.value)}
                                    className="w-full px-3 py-2.5 text-xs font-medium bg-white border border-[#E6DFD5] text-[#3D2F24] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] appearance-none transition-colors"
                                >
                                    <option value="beginner">Beginner Tier</option>
                                    <option value="intermediate">Intermediate Tier</option>
                                    <option value="advanced">Advanced Masterclass</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8C6D53]">
                                    <ChevronDown className="h-3.5 w-3.5" />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Search Results */}
                    <main className="lg:col-span-3 space-y-12">
                        {/* Courses Grid */}
                        <div>
                            {isLoading && <CourseLoader />}
                            {data && data.courses && data.courses.length > 0 ? (
                                <CourseCard featuredCourses={data.courses} />
                            ) : (
                                <div className="w-full h-[calc(100vh-400px)] flex flex-col items-center justify-center">
                                    <p className="font-serif italic text-lg text-[#6E5D4F]">No courses found matching criteria.</p>
                                    <p className="text-xs text-[#A39281] mt-2 uppercase tracking-wider">Try adjusting your refine configuration selectors.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination Control Layout */}
                        {page > 1 && (
                            <div className="pt-6 border-t border-[#E6DFD5] flex items-center justify-between">
                                <button
                                    onClick={() => changePage(page - 1)}
                                    disabled={page === 1}
                                    className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#3D2F24] bg-white border border-[#E6DFD5] rounded-md disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>

                                <span className="text-xs font-semibold text-[#A39281] tracking-wider uppercase">
                                    Page {page} <span className="font-normal text-xs text-[#8C6D53] lowercase">of</span> {data?.pagination.totalPages}
                                </span>

                                <button
                                    onClick={() => changePage(page + 1)}
                                    disabled={page === data?.pagination.totalPages}
                                    className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#3D2F24] bg-white border border-[#E6DFD5] rounded-md disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </div>
    );
}

export default CourseList;
