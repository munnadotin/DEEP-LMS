import { ChevronRight } from "lucide-react"
import Link from "next/link"

function CourseFeature() {
    return (
        <div className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Courses</h2>
                        <p className="text-(--muted-foreground) mt-1">Hand-picked courses to accelerate your learning</p>
                    </div>
                    <Link
                        href="/course"
                        className="inline-flex items-center gap-1 text-sm font-medium text-(--primary) hover:text-(--primary-hover) transition-colors duration-200"
                    >
                        View All
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CourseFeature