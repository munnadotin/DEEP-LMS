"use client"

import { Star, Trash2, User } from "lucide-react";
import { Review } from "@/types/Course.type";
import type { IUser } from "@/types/User.type";
import ReviewForm from "../forms/ReviewForm";
import { useDeleteReviewByIdMutation } from "@/redux/features/reviewApi";
import toast from "react-hot-toast";
import { useGetAllEnrollmentsQuery } from "@/redux/features/enrollApi";

interface CourseReviewProps {
    courseId: string;
    user: IUser | null;
    reviews: Review[];
}

export default function CourseReview({ courseId, user, reviews }: CourseReviewProps) {
    const [deleteReview, { isLoading }] = useDeleteReviewByIdMutation();
    const userReviewed = reviews.some((rev) => user && user._id === rev.user._id);
    const { data, isLoading: enrollLoading } = useGetAllEnrollmentsQuery(undefined, {
        skip: !user
    });
    const enrolledInCourse = data?.data.some((enroll) => enroll.course._id === courseId);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-[#3D2F24]">Course Reviews</h2>
            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <p className="text-[#6E5A4B] text-sm italic">
                        No reviews yet. Be the first to review this course!
                    </p>
                ) : (
                    isLoading ? (
                        <p className="text-[#6E5A4B] text-sm italic text-center">Deleting review...</p>
                    ) : (
                        reviews.map((rev) => (
                            <div
                                key={rev._id}
                                className={`p-4 rounded-lg border transition-all ${user && user._id === rev.user._id ? "bg-white border-[#8C6D53] shadow-sm" : "bg-white/70 border-[#E6DFD5]"}`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-[#E6DFD5] rounded-full text-[#3D2F24]">
                                            <User className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-[#3D2F24]">
                                                {user && user._id === rev.user._id ? "You" : rev.user.name}
                                            </span>
                                            <span className="text-xs block text-[#9E8C7C]">
                                                {new Date(rev.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Star Rating Display */}
                                    <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-4 w-4 ${star <= rev.rating
                                                    ? "fill-[#8C6D53] text-[#8C6D53]"
                                                    : "text-[#E6DFD5]"
                                                    }`}
                                            />
                                        ))}
                                        {user && user._id === rev.user._id && (
                                            <div className="flex items-center gap-2 ml-4">
                                                <Trash2 onClick={() => {
                                                    deleteReview({ courseId, reviewId: rev._id });
                                                    toast.success("Review deleted successfully!");
                                                }} strokeWidth={1.5} className="h-4 w-4 text-[#DC2626] cursor-pointer" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <p className="text-sm text-[#6E5A4B] pl-10 leading-relaxed">
                                    {rev.comment}
                                </p>
                            </div>
                        ))
                    )
                )}
            </div>

            {user && enrolledInCourse && !userReviewed && (
                <div className="mt-6">
                    <ReviewForm user={user} courseId={courseId} />
                </div>
            )}
        </div >
    );
}