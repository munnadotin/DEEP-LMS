import { Course } from "@/types/Course.type"
import { BookOpen, ChevronRight, Clock, Star, Users } from "lucide-react"
import Link from "next/link"
import CourseLoader from "../ui/CourseLoader"

type props = {
    loading?: boolean
    featuredCourses: Course[]
}

function CourseCard(props: props) {
    const formatTotalHours = (seconds: number = 0) => {
        const totalMinutes = Math.floor(seconds / 60);
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;

        return hours > 0 ? `${hours}h ${mins}Min` : `${mins}Min`;
    };

    return (
        <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            {props.loading ? (<CourseLoader />) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {props.featuredCourses.map((course) => (
                        <Link
                            key={course._id}
                            href={`/course/${course.slug}`}
                            className="group block bg-white border border-[#E6DFD5] rounded-lg overflow-hidden tracking-tight transition-colors duration-300"
                        >
                            {/* Image Container with precise aspect ratio */}
                            <div className="relative aspect-16/10 bg-[#FAF7F2] overflow-hidden border-b border-[#E6DFD5]">

                                {course.thumbnail?.url ? (
                                    <img
                                        src={course.thumbnail.url}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#FAF7F2]">
                                        <BookOpen className="h-10 w-10 text-[#C2B7AC]" />
                                    </div>
                                )}
                                {/* Minimalist Flat Level Badge */}
                                <div className="absolute top-3 right-3 px-2 py-1 bg-white/95 border border-[#E6DFD5] text-[10px] font-bold uppercase tracking-widest text-[#8C6D53]">
                                    {course.level}
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-6">
                                {/* Premium Serif Title */}
                                <h3 className="text-lg text-[#3D2F24] line-clamp-1">
                                    {course.title}
                                </h3>

                                {/* body description */}
                                <p className="text-xs text-[#6E5D4F] mt-2 line-clamp-2 leading-relaxed font-normal">
                                    {course.description}
                                </p>

                                {/*  Metadata */}
                                <div className="flex items-center gap-4 mt-4 text-[11px] text-[#A39281] font-medium tracking-wider">
                                    <span className="flex items-center gap-1">
                                        <Users className="h-3.5 w-3.5 text-[#8C6D53]" />
                                        {course.enrolledStudents.length}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5 text-[#8C6D53]" />
                                        {formatTotalHours(course.duration) || 0}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Star className="h-3.5 w-3.5 fill-[#8C6D53] text-[#8C6D53]" />
                                        <span>
                                            {course.averageRating?.toFixed(1) || 0}
                                        </span>
                                    </span>
                                </div>

                                {/* Divider Block */}
                                <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#E6DFD5]/70">
                                    <span className="text-xs italic text-[#A39281]">
                                        By {course.educator?.name}
                                    </span>
                                    <span className="text-base font-semibold text-[#3D2F24]">
                                        ₹{course.price}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {!props.loading && props.featuredCourses.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-(--muted-foreground)/30 mx-auto mb-3" />
                    <p className="text-(--muted-foreground)">No courses available yet</p>
                </div>
            )}
        </section>
    )
}

export default CourseCard