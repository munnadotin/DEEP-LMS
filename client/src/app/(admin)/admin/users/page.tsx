import AdminUser from "@/components/ui/AdminUser"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Users",
    description: "Admin can access all the users"
}

export default function page() {
    return (
        <AdminUser />
    )
}
