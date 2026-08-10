import MyCourse from "@/components/course/MyCourse"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "My Courses", 
    description: "educator route my courses"
}

function page() {
    return (
        <MyCourse />
    )
}

export default page