"use client"

import HeroSection from "../ui/HeroSection";
import FeatureSection from "../ui/FeatureSection";
import CTA from "../ui/CTA";
import CourseCard from "../course/CourseCard";
import CourseFeature from "../ui/CourseFeature";
import { useGetAllCoursesQuery } from "@/redux/features/courseApi";

function Home() {
    const { data, isLoading } = useGetAllCoursesQuery();

    if (!data) return;
    // Featured courses
    const featuredCourses = data?.courses?.slice(0, 6);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <HeroSection />

            {/* Features Section */}
            <FeatureSection />

            {/* Course Feature Section */}
            <CourseFeature />

            {/* Courses Section */}
            <CourseCard featuredCourses={featuredCourses} loading={isLoading} />

            {/* CTA Section */}
            <CTA />
        </div>
    )
}

export default Home;