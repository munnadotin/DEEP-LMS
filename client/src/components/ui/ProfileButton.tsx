"use client";

import { LogOut, UserCircle, ChevronDown, Loader2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { IUser } from '@/types/User.type';
import { useLogOutMutation } from '@/redux/features/authApi';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { permissions } from '@/config/permission';
import { navigation } from '@/config/navigation';

type Props = {
    user: IUser
}

const ProfileButton = ({ user }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [Logout, { isLoading }] = useLogOutMutation();
    const { setUser } = useAuth();
    const router = useRouter();
    const userPermission = permissions[user.role];

    const handleLogout = () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            Logout();
            setUser(null);
            localStorage.removeItem("accessToken");
            router.push("/");
        }
        setIsOpen(false);
    }

    if (isLoading) return <div className='h-screen flex items-center justify-center'>
        <span className='animate-spin'><Loader2 color='brown' className='h-10 w-10' /></span>
    </div>

    return (
        <div className="relative">
            {/* Profile Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-(--border) bg-transparent hover:bg-(--border)/20 transition-colors duration-200 group cursor-pointer"
                aria-label="Profile menu"
            >
                <div className="w-7 h-7 rounded-full bg-(--primary)/10 flex items-center justify-center">
                    <UserCircle className="h-4 w-4 text-(--primary)" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-foreground hidden sm:inline">Profile</span>
                <ChevronDown className={`h-3.5 w-3.5 text-(--muted-foreground) transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-56 bg-(--surface) border border-(--border) rounded-sm overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-(--border)">
                            <p className="text-sm font-medium text-foreground">{user?.name}</p>
                            <p className="text-xs text-(--muted-foreground)">{user?.email}</p>
                            <p className="text-xs text-(--muted-foreground)">{user?.role}</p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                            {navigation.filter((item) => userPermission.includes(item.permission)).map((item) => {
                                const Icon = item.icon;
                                const href = typeof item.href === "function" ? item.href(user?.role) : item.href;
                                return (
                                    <Link
                                        key={item.label}
                                        href={href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-100/70"
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span className='text-sm'>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Divider */}
                        <div className="border-t border-(--border)"></div>

                        {/* Logout */}
                        <div className="py-1">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50/10 transition-colors duration-200 cursor-pointer"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileButton;