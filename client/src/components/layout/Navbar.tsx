"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, LogIn, UserPlus, X, BookOpen } from 'lucide-react';
import Button from '../ui/Button';
import ProfileButton from '../ui/ProfileButton';
import useAuth from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type SearchFormData = {
    search: string;
}

const Navbar = () => {
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const { register, handleSubmit } = useForm<SearchFormData>();
    const { user } = useAuth();
    const router = useRouter();

    const onSubmit = async (data: SearchFormData) => {
        const params = new URLSearchParams();
        if (data.search.trim() === '') return;

        if (data.search) params.set('search', data.search);
        router.push(`/course?${params.toString()}`);
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-(--surface)/80 backdrop-blur-xl border-b font-inter border-(--border)/60 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20 gap-4">

                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2 group shrink-0 select-none">
                        <span className="text-xl font-bold tracking-tight text-foreground">
                            DEEP<span className="text-(--primary) font-black tracking-wide">LMS</span>
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-(--muted-foreground)">
                        <Link href="/course" className="flex items-center gap-1.5 px-3 py-2 rounded-sm hover:text-foreground hover:bg-(--border)/20 transition-all duration-200">
                            <BookOpen className="h-4 w-4 text-(--muted-foreground) group-focus-within:text-(--primary) transition-colors duration-200" strokeWidth={2} />
                            <span className="text-sm font-medium">Explore</span>
                        </Link>
                    </div>

                    {/* Search Field - Desktop */}
                    <form onSubmit={handleSubmit(onSubmit)} className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
                        <div className="relative w-full group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-(--muted-foreground) group-focus-within:text-(--primary) transition-colors duration-200" strokeWidth={2} />
                            </div>
                            <input
                                {...register('search', { required: true })}
                                type="text"
                                autoComplete="off"
                                suppressHydrationWarning
                                placeholder="What do you want to learn today?..."
                                className="block w-full pl-10 pr-4 py-2.5 bg-background/50 border border-(--border) rounded-sm text-sm text-foreground placeholder-(--muted-foreground)/60 focus:outline-none focus:ring-4 focus:ring-(--primary)/10 focus:border-(--primary) focus:bg-background transition-all duration-200"
                            />
                        </div>
                    </form>

                    {/* Auth & Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        {/* Mobile search toggle icon */}
                        <button
                            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                            className="md:hidden p-2 text.muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-(--border)/30"
                        >
                            {isMobileSearchOpen ? (
                                <X className="h-5 w-5 text-(--primary)" strokeWidth={2} />
                            ) : (
                                <Search className="h-5 w-5" strokeWidth={2} />
                            )}
                        </button>

                        {/* User Profile Button */}
                        {user ? <ProfileButton user={user} /> : <>
                            {/* Login Button */}
                            <Button href="/login" text="Login" icon={<LogIn className='h-5 w-5' />} className='text-foreground bg-transparent border border-(--border) rounded-sm hover:bg-(--border)/40 hover:border-foreground/20' />

                            {/* Register Button */}
                            <Button href="/register" text="Get Started" icon={<UserPlus className='h-5 w-5' />} className='text-background bg-foreground rounded-sm hover:bg-(--primary-hover)' />
                        </>}

                    </div>
                </div>

                {/* Mobile Search */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileSearchOpen ? 'max-h-16 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-(--muted-foreground)" strokeWidth={2} />
                        </div>
                        <input
                            // {...register('search', { required: true })}
                            type="text"
                            autoComplete="off"
                            suppressHydrationWarning
                            placeholder="Search courses..."
                            className="block w-full pl-11 pr-4 py-2.5 bg-background border border-(--border) rounded-xl text-sm text-foreground focus:outline-none focus:ring-4 focus:ring-(--primary)/10 focus:border-(--primary)"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;