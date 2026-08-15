import CourseList from "@/components/course/CourseList";
import Loader from "@/components/ui/Loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Explore Courses",
  description: "Find the best courses for you",
};

export default function Course() {
  return (
    <Suspense fallback={<Loader />}>
      <CourseList />
    </Suspense>
  );
}