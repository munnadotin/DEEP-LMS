import { ChevronRight, GraduationCap, PlayCircle, Sparkles, Star, Users } from "lucide-react"
import Button from "./Button"

function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#E6DFD5] tracking-tight">
            <div className="absolute inset-y-0 right-1/2 w-px bg-[#E6DFD5]/40 pointer-events-none hidden lg:block" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
                    {/* Hero Content */}
                    <div className="space-y-8">
                        {/* Micro-Banner */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E6DFD5] rounded-md">
                            <Sparkles className="h-3.5 w-3.5 text-[#8C6D53]" />
                            <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6D53]">
                                Learn from the best
                            </span>
                        </div>

                        {/* Typography */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#3D2F24] leading-[1.15]">
                            Master New Skills with{' '}
                            <span className="italic font-normal text-[#8C6D53] font-serif block sm:inline">
                                Expert-Led
                            </span>{' '}
                            Courses
                        </h1>

                        {/* Body Text */}
                        <p className="text-base sm:text-lg text-[#6E5D4F] max-w-lg leading-relaxed font-normal">
                            Unlock your potential with premium courses taught by industry experts.
                            Learn at your own pace and achieve your career goals.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Button text="Explore Courses" icon={<ChevronRight className="h-4 w-4 stroke-[2.5]" />} href="/course" className="px-7 py-3.5 bg-foreground text-white text-xs font-bold uppercase tracking-widest rounded-md transition-colors duration-200 hover:bg-(--primary-hover)" />

                            <Button text="Browse All" icon={<PlayCircle className="h-4 w-4" />} href="#courses" className="px-7 py-3.5 bg-white text-foreground text-xs font-bold uppercase tracking-widest rounded-md transition-colors duration-200" />
                        </div>

                        {/* Elegant Minimalist Stats */}
                        <div className="flex items-center gap-8 pt-6 border-t border-[#E6DFD5]/60 max-w-md">
                            <div>
                                <p className="text-2xl font-serif font-semibold text-[#3D2F24]">50+</p>
                                <p className="text-xs font-medium uppercase tracking-wider text-[#A39281] mt-1">Expert Courses</p>
                            </div>
                            <div className="h-8 w-px bg-[#E6DFD5]"></div>
                            <div>
                                <p className="text-2xl font-serif font-semibold text-[#3D2F24]">10K+</p>
                                <p className="text-xs font-medium uppercase tracking-wider text-[#A39281] mt-1">Active Students</p>
                            </div>
                            <div className="h-8 w-px bg-[#E6DFD5]"></div>
                            <div>
                                <p className="text-2xl font-serif font-semibold text-[#3D2F24]">4.8</p>
                                <p className="text-xs font-medium uppercase tracking-wider text-[#A39281] mt-1">Avg Rating</p>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder */}
                    <div className="relative lg:flex justify-center hidden">
                        <div className="relative w-full max-w-md aspect-4/5 bg-white border border-[#E6DFD5] rounded-xl p-8 flex flex-col justify-between">

                            {/* Top corner design accent line */}
                            <div className="absolute top-0 right-0 border-t border-r border-[#8C6D53]/30 w-12 h-12 rounded-tr-xl pointer-events-none" />

                            {/* Central minimalist badge artwork */}
                            <div className="my-auto text-center space-y-4">
                                <div className="inline-flex items-center justify-center p-5 bg-[#FAF7F2] rounded-full border border-[#E6DFD5]">
                                    <GraduationCap className="h-12 w-12 text-[#8C6D53]" />
                                </div>
                                <div>
                                    <p className="text-sm font-serif italic text-[#3D2F24]">The Art of Continuous Learning</p>
                                    <p className="text-xs uppercase tracking-widest text-[#A39281] mt-1">Premium Platform</p>
                                </div>
                            </div>

                            {/* badges */}
                            <div className="absolute -top-4 -right-4 bg-[#FAF7F2] border border-[#E6DFD5] px-4 py-2.5 rounded-md">
                                <div className="flex items-center gap-2">
                                    <Star className="h-3.5 w-3.5 text-[#8C6D53] fill-[#8C6D53]" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#3D2F24]">4.8 / 5.0</span>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 -left-4 bg-[#FAF7F2] border border-[#E6DFD5] px-4 py-2.5 rounded-md">
                                <div className="flex items-center gap-2">
                                    <Users className="h-3.5 w-3.5 text-[#8C6D53]" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#3D2F24]">10K+ Enrolled</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection