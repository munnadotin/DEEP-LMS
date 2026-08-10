"use client"

import { useCreateReviewMutation } from '@/redux/features/reviewApi';
import { IUser } from '@/types/User.type';
import { Send, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

type ReviewFormProps = {
    comment: string;
    rating: string;
}

export default function ReviewForm({ courseId, user }: { courseId: string; user: IUser }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ReviewFormProps>();
    const [rating, setRating] = useState(0);
    const [createReview, { isLoading }] = useCreateReviewMutation();
    const router = useRouter();

    const onSubmit = async (data: ReviewFormProps) => {
        try {
            if (!user) {
                toast.error("You must be logged in to submit a review.");
                return router.push("/login");
            }
            const res = await createReview({ courseId, data }).unwrap();
            toast.success(res.data.message || "Review submitted successfully");
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || "Failed to submit review");
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 p-5 bg-white border border-[#E6DFD5] rounded-lg shadow-sm"
        >
            <h3 className="text-lg font-semibold">Leave a Review</h3>

            {/* Star Rating Select */}
            <div className="flex items-center gap-1 py-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => {
                            setRating(star);
                            setValue("rating", String(star));
                        }}
                        className="transition-transform hover:scale-110 cursor-pointer"
                    >
                        <Star className={`h-7 w-7 transition-colors ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                    </button>
                ))}

                <span className="ml-3 text-sm text-gray-600">
                    {rating ? `${rating} / 5` : "Select rating"}
                </span>

                <input
                    type="hidden"
                    {...register("rating", { required: "Rating is required" })}
                />

                {errors.rating && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.rating.message}
                    </p>
                )}
            </div>

            {/* Textarea */}
            <textarea
                rows={4}
                {...register("comment", { required: true })}
                placeholder="Write your thoughts about this course..."
                required
                className="w-full px-4 py-3 text-sm bg-[#FAF7F2] text-[#3D2F24] placeholder-[#C2B7AC] border border-[#E6DFD5] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] transition-all resize-none mb-4"
            />


            {/* Submit Button */}
            <button
                type="submit"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#8C6D53] hover:bg-[#6E5A4B] text-white text-sm font-medium rounded-md shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Send className="h-4 w-4" />
                {isLoading ? "Submitting..." : "Submit Review"}
            </button>
        </form>
    )
}
