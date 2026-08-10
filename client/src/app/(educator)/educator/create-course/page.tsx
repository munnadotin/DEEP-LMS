import CreateCouresForm from "@/components/forms/CreateCouresForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Create Course",
    description: "create courses"
}

function page() {
    return <CreateCouresForm />
}

export default page