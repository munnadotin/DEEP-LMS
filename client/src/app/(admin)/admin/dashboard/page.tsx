import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "this is admin dashboard"
}

export default function page() {
  return (
    <AdminDashboard />
  )
}
