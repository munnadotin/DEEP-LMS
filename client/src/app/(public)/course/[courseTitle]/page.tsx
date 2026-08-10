import CourseDetails from "@/components/course/CourseDetails";
import type { Metadata } from "next";

type Props = {
    params: Promise<{
        courseTitle: string;
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { courseTitle } = await params;

    return {
        title: courseTitle,
        description: `${courseTitle} course`,
    };
}

export default async function Page({ params }: Props) {
    const { courseTitle } = await params;

    return <CourseDetails courseTitle={courseTitle} />;
}