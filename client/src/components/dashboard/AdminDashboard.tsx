"use client"

import { useAdminDashboardQuery } from "@/redux/features/courseApi"

export default function AdminDashboard() {
    const { data, isLoading } = useAdminDashboardQuery();
    console.log(data)
    return (
        <div>AdminDashboard</div>
    )
}
