import { Chapter, Lesson } from '@/types/Course.type';
import { FileText, Lock, Play } from 'lucide-react';
import { useState } from 'react';
import CourseView from '../ui/CourseView';
import { useGetAllEnrollmentsQuery } from '@/redux/features/enrollApi';
import Loader from '../ui/Loader';
import { IUser } from '@/types/User.type';

type Props = {
    chapters: Chapter[];
    courseId: string;
    user: IUser | null;
}

function CourseSyllabus({ user, chapters, courseId }: Props) {
    const [viewCourse, setViewCourse] = useState(false);
    const [courseLesson, setCourseLesson] = useState<Lesson | null>(null);
    const { data, isLoading } = useGetAllEnrollmentsQuery(undefined, {
        skip: !user
    });

    const currentEnrollmentCourse = data?.data.find(e => e.course._id === courseId) ?? null;

    const handleLessonOpen = (lesson: Lesson) => {
        if (!lesson.isFree && !user) return;

        setViewCourse(true);
        setCourseLesson(lesson);
    };

    const canPreviewLesson = Boolean(courseLesson?.isFree || currentEnrollmentCourse);

    if (isLoading) return <Loader />;

    return (
        <div className="space-y-6">
            {chapters.map((chapter, index) => (
                <div key={chapter._id} className="bg-white border border-[#E6DFD5] rounded-xl overflow-hidden">
                    {/* chapter label */}
                    <div className="px-6 py-4 border-b border-[#E6DFD5] bg-[#FAF7F2]/50 flex items-center justify-between">
                        <div className="space-y-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A39281]">
                                Chapter {index + 1}
                            </span>
                            <h3 className="text-base text-[#3D2F24]">
                                {chapter.title}
                            </h3>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6D53] bg-white border border-[#E6DFD5] px-2.5 py-1 rounded">
                            {chapter.lessons?.length || 0} Lectures
                        </span>
                    </div>

                    {/* Lesson mapping */}
                    <div className="divide-y divide-[#E6DFD5]/60">
                        {chapter.lessons.map(lesson => (
                            <div key={lesson._id} className="px-6 py-4 flex items-start sm:items-center justify-between gap-4 bg-white">
                                <button onClick={() => handleLessonOpen(lesson)} className="flex items-start gap-3.5 cursor-pointer">
                                    <div className="mt-0.5 sm:mt-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#E6DFD5] shrink-0">
                                        {lesson.isFree ? (
                                            <Play className="h-3 w-3 text-[#8C6D53] fill-[#8C6D53]" />
                                        ) : (
                                            <Lock className="h-3 w-3 text-[#A39281]" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-[#3D2F24]">
                                            {lesson.title}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-1 text-[11px] text-[#A39281] font-medium tracking-wider capitalize">
                                            <span>
                                                {Math.floor(lesson.duration / 60)} min {lesson.duration % 60} sec
                                            </span>
                                            {lesson.resources && lesson.resources.length > 0 && (
                                                <>
                                                    <div className="w-1 h-1 rounded-full bg-[#E6DFD5]" />
                                                    <span className="flex items-center gap-0.5 normal-case"><FileText className="h-3 w-3" /> {lesson.resources.length} resources</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {viewCourse && courseLesson && canPreviewLesson && (
                <CourseView
                    courseId={courseId}
                    lessonId={courseLesson._id}
                    courseLesson={courseLesson}
                    setViewCourse={setViewCourse}
                    enrollment={currentEnrollmentCourse ?? undefined}
                />
            )}
        </div>
    )
}

export default CourseSyllabus