import { TrendingUp } from "lucide-react";
import Link from "next/link";
import Button from "./Button";

export default function CTA() {
    return (
        <section className="bg-[#FAF7F2] border-t border-[#E6DFD5] py-20 lg:py-28 tracking-tight relative overflow-hidden">
            {/* background accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-[#8C6D53]/30 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center pt-8">
                {/* Tagline */}
                <span className="text-xs font-semibold tracking-widest text-[#8C6D53] uppercase block mb-3">
                    Begin Your Enrollment
                </span>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-[#3D2F24] mb-6 leading-tight">
                    Ready to Start Your <br className="hidden sm:inline" />
                    <span className="italic font-normal font-serif text-[#8C6D53]">Learning Journey?</span>
                </h2>

                {/* description body */}
                <p className="text-sm sm:text-base text-[#6E5D4F] max-w-xl mx-auto mb-8 leading-relaxed font-normal">
                    Join thousands of students already learning on DEEP LMS.
                    Gain exclusive access to premium, carefully curated courses and expert instruction.
                </p>

                {/* Button */}
                <div className="inline-block">
                    <Button text=" Get Started Today" href="/register" icon={<TrendingUp className="h-4 w-4 stroke-[2.5]" />} className="px-7 py-3.5 
                    bg-foreground text-white text-xs font-bold uppercase tracking-widest rounded-md transition-colors duration-200 hover:bg-(--primary-hover)" />
                </div>
            </div>
        </section>
    )
}
