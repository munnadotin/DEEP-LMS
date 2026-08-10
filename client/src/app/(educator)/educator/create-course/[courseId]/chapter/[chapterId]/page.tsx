"use client"

import LessonList from '@/components/lesson/LessonList';
import { useParams } from 'next/navigation'

export default function page() {
    const param = useParams();

    return (
        <LessonList courseId={param.courseId as string} chapterId={param.chapterId as string} />
    )
}
