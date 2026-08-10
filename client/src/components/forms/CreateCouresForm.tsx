"use client"

import { Course, CreateCourse } from "@/types/Course.type";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image as ImageIcon, AlertCircle, ChevronUp, Loader2 } from "lucide-react";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import { useCreateCourseMutation } from "@/redux/features/courseApi";
import DraftCourse from "../course/DraftCourse";
import Loader from "../ui/Loader";
import toast from "react-hot-toast";

function CreateCourseForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateCourse>();
    const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);
    const { data, isLoading } = useGetCategoryQuery();
    const [CreateCourse, { isLoading: courseLoading }] = useCreateCourseMutation();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewThumbnail(previewUrl);
        }
    };

    const onSubmit = async (data: CreateCourse) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("category", data.category);
            formData.append("language", data.language);
            formData.append("level", data.level);
            formData.append("price", data.price.toString());
            formData.append("thumbnail", data.thumbnail[0]);
            const res = await CreateCourse(formData).unwrap();
            setPreviewThumbnail(null);
            reset();
            toast.success(res.message || "Course created successfully");
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || error?.response?.data?.message || error?.message || "Failed to create course");
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-12 min-h-screen text-[#3D2F24] tracking-tight">
            {/* Header Section */}
            <div className="border-b border-[#E6DFD5] pb-6 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D53] block mb-1">
                    Creator Portal
                </span>
                <h1 className="text-3xl font-serif font-medium">Create New Course</h1>
                <p className="text-xs text-[#A39281] mt-1 font-normal">
                    Publish a new educational program for your student collective.
                </p>

                {/* Draft Courses */}
                <DraftCourse />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white border border-[#E6DFD5] p-8 rounded-xl">
                {/* Course Thumbnail Upload Field */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C] block">
                        Course Thumbnail
                    </label>
                    <div className="relative aspect-video w-full max-w-md bg-[#FAF7F2] border border-dashed border-[#E6DFD5] rounded-xl overflow-hidden flex flex-col items-center justify-center text-center p-6">
                        {previewThumbnail ? (
                            <img
                                src={previewThumbnail}
                                alt="Thumbnail Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center space-y-2 text-[#A39281]">
                                <ImageIcon className="h-8 w-8 text-[#C2B7AC]" />
                                <span className="text-xs font-medium uppercase tracking-wider">
                                    Upload High-Res Cover Image
                                </span>
                                <span className="text-[10px] text-[#C2B7AC]">
                                    PNG, JPG or WEBP up to 5MB
                                </span>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            {...register("thumbnail" as any, { required: "Course thumbnail is required" })}
                            onChange={(e) => {
                                handleImageChange(e);
                                register("thumbnail" as any).onChange(e);
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                    </div>
                    {errors.thumbnail && (
                        <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" /> {errors.thumbnail?.message as string}
                        </p>
                    )}
                </div>

                {/* Course Title */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]">
                        Course Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="e.g. Masterclass in Artisan Espresso Brewing"
                        {...register("title", { required: "Course title is required" })}
                        className="w-full px-4 py-3 text-xs font-medium bg-white border border-[#E6DFD5] text-[#3D2F24] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] transition-colors placeholder:text-[#C2B7AC]"
                    />
                    {errors.title && (
                        <p className="text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.title.message as string}
                        </p>
                    )}
                </div>

                {/* Course Description */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        placeholder="Provide an overview of the curriculum and learning outcomes..."
                        {...register("description", { required: "Description is required" })}
                        className="w-full px-4 py-3 text-xs font-medium bg-white border border-[#E6DFD5] text-[#3D2F24] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] transition-colors placeholder:text-[#C2B7AC] resize-none"
                    />
                    {errors.description && (
                        <p className="text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.description.message as string}
                        </p>
                    )}
                </div>

                {/* Category & Pric */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]">
                            Category
                        </label>
                        <div className="relative">
                            <select
                                id="category"
                                {...register("category" as any, { required: "Select a category" })}
                                className="w-full px-4 py-3 text-xs font-medium bg-white border border-[#E6DFD5] text-[#3D2F24] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] appearance-none transition-colors"
                            >
                                {data?.categories.map((category) => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8C6D53]">
                                <ChevronUp className="h-4 w-4" />
                            </div>
                        </div>
                        {errors.category && (
                            <p className="text-xs text-red-600 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {errors.category.message as string}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="price" className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            placeholder="e.g. 199"
                            {...register("price", {
                                required: "Price is required",
                                min: { value: 0, message: "Price cannot be negative" }
                            })}
                            className="w-full px-4 py-3 text-xs font-medium bg-white border border-[#E6DFD5] text-[#3D2F24] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] transition-colors placeholder:text-[#C2B7AC]"
                        />
                        {errors.price && (
                            <p className="text-xs text-red-600 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {errors.price.message as string}
                            </p>
                        )}
                    </div>
                </div>

                {/* Level & Language */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Level */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="level" className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]">
                            Difficulty Level
                        </label>
                        <div className="relative">
                            <select
                                id="level"
                                {...register("level", { required: "Select a level" })}
                                className="w-full px-4 py-3 text-xs font-medium bg-white border border-[#E6DFD5] text-[#3D2F24] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] appearance-none transition-colors"
                            >
                                <option value="beginner">Beginner Tier</option>
                                <option value="intermediate">Intermediate Tier</option>
                                <option value="advanced">Advanced Masterclass</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8C6D53]">
                                <ChevronUp className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    {/* Language */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="language" className="text-xs font-bold uppercase tracking-wider text-[#5C4A3C]">
                            Instruction Language
                        </label>
                        <input
                            type="text"
                            id="language"
                            placeholder="e.g. English"
                            {...register("language", { required: "Language is required" })}
                            className="w-full px-4 py-3 text-xs font-medium bg-white border border-[#E6DFD5] text-[#3D2F24] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] transition-colors placeholder:text-[#C2B7AC]"
                        />
                        {errors.language && (
                            <p className="text-xs text-red-600 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {errors.language.message as string}
                            </p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-[#E6DFD5] flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#A39281] bg-transparent hover:text-[#3D2F24] transition-colors"
                    >
                        Reset Form
                    </button>

                    <button
                        type="submit"
                        className="px-8 py-3.5 text-[#3D2F24] bg-[#FAF7F2] text-xs font-bold uppercase tracking-widest rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C6D53] transition-colors cursor-pointer"
                    >
                        {courseLoading ?
                            (<span><Loader2 color="brown" className="h-4 w-4 animate-spin" /></span>) :
                            "Draft"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateCourseForm;