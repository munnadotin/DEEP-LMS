import EduDashboard from "@/components/dashboard/EduDashboard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Educator Dashboard"
}

function page() {
  return (
    <EduDashboard />
  )
}

export default page