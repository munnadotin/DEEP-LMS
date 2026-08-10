"use client"

import { useRegisterUserMutation } from "@/redux/features/authApi";
import { RegisterUser } from "@/types/User.type";
import { ChevronDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";

function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterUser>();
    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const onSubmit = async (data: RegisterUser) => {
        try {
            await registerUser(data).unwrap();
            toast.success("Account created successfully! Please check your email to verify your account.", { duration: 5000 });
        } catch (error: any) {
            console.log(error);
            toast.error(error?.error?.data.message);
        }
    }

    return (
        <div className="py-16">
            <div className="max-w-md w-full mx-auto p-10 bg-[--background] border border-[#E6DFD5] rounded-xl tracking-tight shadow-sm">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <span className="text-xs font-semibold tracking-widest text-[#8C6D53] uppercase block mb-2">
                        Join the LMS
                    </span >
                    <h1 className="text-3xl font-serif font-medium text-[#3D2F24] capitalize">
                        Create Account
                    </h1>
                    <p className="text-xs text-[#A39281] mt-2">
                        Enter your details to create your profile
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-[#5C4A3C]">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="e.g., Munna Kumar"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Please enter your full name"
                                },
                                minLength: {
                                    value: 3,
                                    message: "Full name must be at least 3 characters long"
                                }
                            })}
                            className="w-full px-4 py-3 text-sm bg-white text-[#3D2F24] placeholder-[#C2B7AC] border border-[#E6DFD5] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] transition-all duration-150"
                        />
                        {errors.name && <p className="text-red-700 text-xs font-medium tracking-normal">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-[#5C4A3C]">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="mkcodes.in@gmail.com"
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

                    {/* Role */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="role" className="text-xs font-semibold uppercase tracking-wider text-[#5C4A3C]">
                            Select Your Role
                        </label>
                        <div className="relative">
                            <select
                                id="role"
                                {...register("role")}
                                className="w-full px-4 py-3 text-sm bg-white text-[#3D2F24] border border-[#E6DFD5] rounded-md focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53] appearance-none transition-all duration-150"
                            >
                                <option value="student">Student</option>
                                <option value="educator">Educator</option>
                                {/* <option value="admin">Admin</option> */}
                            </select>
                            {/* Minimalist Custom Chevron Down arrow since we hid the default appearance */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8C6D53]">
                                <ChevronDown className="h-5 w-5" />
                            </div>
                        </div>
                        {errors.role && <p className="text-red-700 text-xs font-medium tracking-normal">{errors.role.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-widest text-[#FAF7F2] bg-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C6D53] focus:ring-offset-2 transition-all duration-150 cursor-pointer"
                        >
                            {isLoading ? <span className="flex items-center justify-center animate-spin"><Loader2 color="white" className="h-4 w-4" /></span> : "Create Account"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
