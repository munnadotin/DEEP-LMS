"use client"

import useAuth from "@/hooks/useAuth";
import { useLoginMutation } from "@/redux/features/authApi";
import { LoginUser } from "@/types/User.type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginUser>();
    const { setUser, user } = useAuth();
    const router = useRouter();
    const [login, { isLoading }] = useLoginMutation();

    const onSubmit = async (data: LoginUser) => {
        try {
            const res = await login(data).unwrap();
            if (res) {
                const accessToken = res?.data?.accessToken;
                localStorage.setItem("accessToken", accessToken);
                setUser(res.data);
                toast.success(res?.message);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Login failed");
        }
    };

    // if user logged and try to login again, redirect to home page
    useEffect(() => {
        if (user) {
            router.replace("/");
        }
    }, [])

    return (
        <div className="py-16">
            <div className="max-w-md w-full mx-auto p-10 bg-[--background] border border-[#E6DFD5] rounded-xl tracking-tight shadow-sm">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <span className="text-xs font-semibold tracking-widest text-[#8C6D53] uppercase block mb-2">
                        Join the LMS
                    </span>
                    <h1 className="text-3xl font-serif font-medium text-[#3D2F24] capitalize">
                        Login
                    </h1>
                    <p className="text-xs text-[#A39281] mt-2">
                        Enter your details to login
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-[#5C4A3C]">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="mkcodes.in@gmail.com"
                            suppressHydrationWarning
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Please enter your email address"
                                },
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter a valid email address"
                                }
                            })}
                            className="w-full px-4 py-3 text-sm bg-white text-[#3D2F24] placeholder-[#C2B7AC] border border-[#E6DFD5] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] transition-all duration-150"
                        />
                        {errors.email && <p className="text-red-700 text-xs font-medium tracking-normal">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-[#5C4A3C]">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            suppressHydrationWarning
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Please enter your password"
                                },
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                }
                            })}
                            className="w-full px-4 py-3 text-sm bg-white text-[#3D2F24] placeholder-[#C2B7AC] border border-[#E6DFD5] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] transition-all duration-150"
                        />
                        {errors.password && <p className="text-red-700 text-xs font-medium tracking-normal">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            suppressHydrationWarning
                            disabled={isLoading}
                            className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-widest text-[#FAF7F2] bg-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C6D53] focus:ring-offset-2 transition-all duration-150 cursor-pointer"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
