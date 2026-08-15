"use client";

import { BookOpen, Globe, Award, Loader2 } from 'lucide-react';
import { useGetCourseBySlugQuery } from "@/redux/features/courseApi";
import CourseHeader from "@/components/course/CourseHeader";
import CourseSyllabus from "@/components/course/CourseSyllabus";
import Loader from "@/components/ui/Loader";
import { useCreateEnrollmentMutation, useVerifyEnrollmentMutation } from '@/redux/features/enrollApi';
import { Course } from '@/types/Course.type';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import CourseReview from './CourseReview';

function CourseDetails({ courseTitle }: { courseTitle: string }) {
    const { user } = useAuth();
    const { data, isLoading } = useGetCourseBySlugQuery(courseTitle);
    const [createEnrollment, { isLoading: enrollLoading }] = useCreateEnrollmentMutation();
    const [verifyEnrollment, { isLoading: verifyLoading }] = useVerifyEnrollmentMutation();
    const router = useRouter();

    if (!data) return;

    const sortedChapters = [...(data?.course.chapters || [])].sort((a, b) => a.position - b.position);

    const handleEnroll = async (course: Course) => {
        if (!user) {
            router.push("/login");
            return;
        }
        try {
            const data = await createEnrollment(course._id).unwrap();
            const options = {
                key: data.key,
                amount: data.order.amount,
                currency: data.order.currency,
                order_id: data.order.id,
                name: "DEEP LMS",
                description: course.title,

                handler: async function (response: any) {
                    try {
                        const verify = await verifyEnrollment(response).unwrap();

                        if (verify.success) {
                            toast.success("Course Enrolled successfully")
                        }
                    } catch (err) {
                        toast.error("Verification Error")
                        console.error("Verification Error:", err);
                    }
                },

                prefill: {
                    name: user!.name,
                    email: user!.email,
                },

                theme: {
                    color: "#4F46E5",
                },
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) return <Loader />;

    return (
        <div className="bg-[#FAF7F2] min-h-screen tracking-tight text-[#3D2F24] pb-20">
            {/* Header Section */}
            <CourseHeader
                level={data?.course.level!}
                title={data?.course.title!}
                description={data?.course.description!}
                educator={data?.course.educator.name!}
                duration={data?.course.duration!}
                students={data?.course.enrolledStudents!}
            />

            {/* Core Split Body Content */}
            <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Left Side */}
                    <div className="lg:col-span-2 space-y-10">
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#8C6D53] mb-6 block">
                                Syllabus & Structure
                            </h2>

                            {/* Chapter Stack */}
                            <CourseSyllabus user={user ?? null} courseId={data?.course._id} chapters={sortedChapters} />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="lg:col-span-1 lg:sticky lg:top-8 space-y-6">
                        <div className="bg-white border border-[#E6DFD5] rounded-xl p-6 overflow-hidden">
                            {/* Preview Window */}
                            <div className="relative aspect-video bg-[#FAF7F2] rounded-lg border border-[#E6DFD5] overflow-hidden mb-6 flex items-center justify-center">
                                {data?.course.thumbnail?.url ? (
                                    <img
                                        src={data?.course.thumbnail.url}
                                        alt={data?.course.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <BookOpen className="h-10 w-10 text-[#C2B7AC]" />
                                )}
                            </div>

                            {/* Price Tag */}
                            <div className="mb-6">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A39281] block mb-1">
                                    Full Tuition Investment
                                </span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-semibold text-[#3D2F24]">
                                        ₹{data?.course.price}
                                    </span>
                                    <span className="text-xs text-[#A39281] font-medium uppercase tracking-wider">
                                        One-Time Payment
                                    </span>
                                </div>
                            </div>

                            {/* Action CTA Button */}
                            {data?.course.isEnrolled ? (
                                <button
                                    disabled
                                    className="w-full py-3.5 px-4 bg-[#807165] text-[#FAF7F2] cursor-not-allowed text-xs font-bold rounded-md uppercase"
                                >
                                    Already Enrolled
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEnroll(data?.course)}
                                    className="w-full py-3.5 px-4 bg-[#3D2F24] text-[#FAF7F2] cursor-pointer tracking-widest focus:outline-none focus:ring-2 focus:ring-[#8C6D53] focus:ring-offset-2 transition-colors text-xs font-bold rounded-md uppercase"
                                >
                                    {enrollLoading || verifyLoading ? <span className='animate-spin flex items-center justify-center'><Loader2 color='white' className='h-4 w-4' /></span> : "Enroll In Course"}
                                </button>
                            )}
                            {/* Short Features Checklist Container */}
                            <div className="mt-6 pt-6 border-t border-[#E6DFD5] space-y-3">
                                <div className="flex items-center gap-3 text-xs text-[#6E5D4F] font-medium">
                                    <Award className="h-4 w-4 text-[#8C6D53] shrink-0" />
                                    <span>Verifiable Certificate of Completion</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-[#6E5D4F] font-medium">
                                    <Globe className="h-4 w-4 text-[#8C6D53] shrink-0" />
                                    <span>Full Lifetime Access to Curriculum</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Course Review Section */}
                <div className="py-12">
                    <CourseReview courseId={data?.course._id} user={user || null} reviews={data?.course.review || []} />
                </div>
            </main>
        </div>
    );
}

export default CourseDetails