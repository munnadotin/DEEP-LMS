import CourseList from "@/components/course/CourseList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Courses",
  description: "Find the best courses for you",
}

export default function Course() {
  return <CourseList />
}