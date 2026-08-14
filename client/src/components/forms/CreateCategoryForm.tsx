"use client";

import { useCreateCategoryMutation, useUpdateCategoryMutation } from "@/redux/features/categoryApi";
import { AlertCircle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CategoryType = {
    name: string;
};

type OldCategoryType = {
    _id: string;
    name: string;
    slug: string;
}

type Props = {
    setActiveModel: Dispatch<SetStateAction<boolean>>;
    category?: OldCategoryType | null;
}

export default function CreateCategoryForm({ setActiveModel, category }: Props) {
    const [createCategory, { isLoading }] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CategoryType>({
        defaultValues: {
            name: category?.name || "",
        },
    });

    const onSubmit = async (data: CategoryType) => {
        try {
            if (category) {
                const res = await updateCategory({ slug: category.slug, data }).unwrap();
                toast.success(res.message);
            } else {
                const res = await createCategory(data).unwrap();
                toast.success(res.message);
            }
            reset();
            setActiveModel(false);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || "Failed to create category")
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3D2F24]/30 backdrop-blur-[2px] p-4">
            {/* Modal */}
            <div className="w-full max-w-md rounded-md border border-[#E6DFD5] bg-[#FAF8F4] text-[#3D2F24] shadow-xl">
                {/* Header */}
                <div className="border-b border-[#E6DFD5] px-6 py-5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6D53]">
                        Category
                    </span>

                    <h2 className="mt-1 font-serif text-2xl font-medium">
                        Create category
                    </h2>

                    <p className="mt-1.5 text-sm leading-relaxed text-[#8C6D53]">
                        Add a new category to organize your content.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-6 py-6"
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#8C6D53]"
                        >
                            Category name
                        </label>

                        <input
                            {...register("name", { required: "Category name is required." })}
                            id="name"
                            type="text"
                            placeholder="e.g. Technology"
                            className={`w-full rounded border bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#3D2F24] outline-none transition-colors placeholder:text-[#B4A493] ${errors.name ? "border-red-400 focus:border-red-500" : "border-[#E6DFD5] focus:border-[#8C6D53]"}`}
                        />

                        {errors.name && (
                            <p className="flex items-center gap-1 mt-1.5 text-xs text-red-700">
                                <AlertCircle className="h-3 w-3" />  {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveModel(false)}
                            disabled={isSubmitting || isLoading}
                            className="rounded border border-[#E6DFD5] px-4 py-2 text-sm text-[#8C6D53] transition-colors hover:bg-[#F3EEE7] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            className="rounded bg-[#3D2F24] px-4 py-2 text-sm text-[#E6DFD5] transition-colors hover:bg-[#4B3A2D] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        >
                            {category ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}