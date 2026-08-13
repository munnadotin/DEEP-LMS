"use client"

import { useDeleteCategoryMutation, useGetCategoryQuery } from "@/redux/features/categoryApi"
import { Edit2, Trash2 } from "lucide-react";
import Loader from "./Loader";
import { useState } from "react";
import CreateCategoryForm from "../forms/CreateCategoryForm";
import toast from "react-hot-toast";

type OldCategoryType = {
    _id: string;
    name: string;
    slug: string;
}

export default function AdminCategory() {
    const { data, isLoading } = useGetCategoryQuery();
    const [activeModel, setActiveModel] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<null | OldCategoryType>(null);
    const [deleteCategory] = useDeleteCategoryMutation();

    const categories = data?.categories;

    async function handleDelete(slug: string) {
        try {
            const res = await deleteCategory(slug).unwrap();
            toast.success(res.message);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || "Failed to delete category");
        }
    }

    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className="max-w-6xl mx-auto p-6 text-[#3D2F24] border-[#E6DFD5] tracking-tight">
            {/* Header */}
            <div className="mb-6 border-b border-[#E6DFD5] pb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6D53]">
                    Category
                </span>
                <h2 className="mt-1 text-2xl font-serif font-medium text-[#3D2F24]">
                    Manage Categories
                </h2>
                <div className="flex items-center justify-between">
                    <p className="mt-2 text-sm leading-relaxed text-[#8C6D53]">
                        Create, update and delete categories.
                    </p>
                    <button onClick={() => {
                        setActiveModel(true);
                        setSelectedCategory(null);
                    }} className="py-1.5 px-4 bg-[#3D2F24] text-[#E6DFD5] rounded cursor-pointer">
                        Create category
                    </button>
                </div>
            </div>

            {/* Categories */}
            <div className="divide-y divide-[#E6DFD5] border border-[#E6DFD5] rounded-md overflow-hidden bg-[#FAF8F4]">
                {categories?.map((category) => (
                    <div
                        key={category._id}
                        className="flex items-center justify-between px-4 py-3.5 hover:bg-[#F3EEE7] transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <h3 className="text-sm font-medium text-[#3D2F24]">
                                {category.name}
                            </h3>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setActiveModel(true);
                                }}
                                className="p-2 rounded hover:bg-[#E6DFD5] text-[#8C6D53] hover:text-[#3D2F24] transition-colors cursor-pointer"
                            >
                                <Edit2 strokeWidth={1.5} className="h-4 w-4" />
                            </button>

                            <button
                                onClick={() => handleDelete(category.slug)}
                                className="p-2 rounded hover:bg-[#E6DFD5] text-[#8C6D53] hover:text-red-700 transition-colors cursor-pointer"
                            >
                                <Trash2 strokeWidth={1.5} className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Model */}
            {activeModel && <CreateCategoryForm category={selectedCategory} setActiveModel={setActiveModel} />}
        </div>
    )
}
