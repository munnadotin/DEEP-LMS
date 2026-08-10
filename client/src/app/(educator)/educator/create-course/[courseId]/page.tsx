"use client"

import ChapterList from "@/components/chapters/ChapterList";
import { useParams } from "next/navigation"

function page() {
    const param = useParams();

    return (
        <ChapterList courseId={param.courseId as string} />
    )
}

export default page