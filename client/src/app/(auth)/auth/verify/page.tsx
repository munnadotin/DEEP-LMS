import { Suspense } from "react";
import Loader from "@/components/ui/Loader";
import AccountVerificationContent from "@/components/auth/VerifyAccount";

export default function page() {
    return (
        <Suspense fallback={<Loader />}>
            <AccountVerificationContent />
        </Suspense>
    );
}