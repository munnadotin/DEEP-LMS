import { Award, BarChart3, Clock, Globe } from "lucide-react";

export default function FeatureSection() {
    return (
        <section className="bg-[#FAF7F2] border-b border-[#E6DFD5] py-10 tracking-tight">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Responsive grid with crisp, flat border separators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y sm:divide-y-0 md:divide-x divide-[#E6DFD5]/70">

                    {/* Feature 1 */}
                    <div className="flex items-center gap-4 sm:p-2 md:px-6 md:py-2 first:pl-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E6DFD5] bg-white shrink-0">
                            <Award className="h-4 w-4 text-[#8C6D53]" />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3D2F24]">
                                Expert Instructors
                            </h3>
                            <p className="text-xs text-[#A39281] mt-0.5 font-normal">
                                Learn from the best
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-center gap-4 pt-6 sm:pt-0 sm:p-2 md:px-6 md:py-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E6DFD5] bg-white shrink-0">
                            <Clock className="h-4 w-4 text-[#8C6D53]" />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3D2F24]">
                                Self-Paced
                            </h3>
                            <p className="text-xs text-[#A39281] mt-0.5 font-normal">
                                Learn at your speed
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-center gap-4 pt-6 sm:pt-0 sm:p-2 md:px-6 md:py-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E6DFD5] bg-white shrink-0">
                            <Globe className="h-4 w-4 text-[#8C6D53]" />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3D2F24]">
                                Global Community
                            </h3>
                            <p className="text-xs text-[#A39281] mt-0.5 font-normal">
                                Connect worldwide
                            </p>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex items-center gap-4 pt-6 sm:pt-0 sm:p-2 md:px-6 md:py-2/2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E6DFD5] bg-white shrink-0">
                            <BarChart3 className="h-4 w-4 text-[#8C6D53]" />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3D2F24]">
                                Career Growth
                            </h3>
                            <p className="text-xs text-[#A39281] mt-0.5 font-normal">
                                Advance your career
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
