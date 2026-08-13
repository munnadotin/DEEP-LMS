import AdminCategory from "@/components/ui/AdminCategory"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Manage Categories",
    description: "Admin can manage categories such as create, update and delete category"
}

export default function page() {
    return (
        <AdminCategory />
    )
}
