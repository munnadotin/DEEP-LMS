import BecomeEducator from "@/components/ui/BecomeEducator"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Become an Educator",
    description: "in this router user change their role by filling the form"
}

export default function page() {
    return (
        <BecomeEducator />
    )
}
