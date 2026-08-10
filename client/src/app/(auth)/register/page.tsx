import RegisterForm from "@/components/forms/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
}

export default function Register() {
    return <RegisterForm />;
}
