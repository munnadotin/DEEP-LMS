import { Clock, Users } from 'lucide-react'

function CourseHeader({ level, description, title, educator, students, duration }: { level: string; description: string; title: string; educator: string, students: [string]; duration: number }) {
    const formatTotalHours = (seconds: number = 0) => {
        const totalMinutes = Math.floor(seconds / 60);
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;

        return hours > 0 ? `${hours}h ${mins}Min` : `${mins}Min`;
    };

    return (
        <header className="border-b border-[#E6DFD5] bg-white py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="max-w-3xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FAF7F2] border border-[#E6DFD5] rounded-md text-[10px] font-bold uppercase tracking-widest text-[#8C6D53]">
                        {level} Tier
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight">
                        {title}
                    </h1>
                    <p className="text-base text-[#6E5D4F] leading-relaxed font-normal max-w-2xl">
                        {description}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#A39281] font-medium uppercase tracking-wider">
                        <span className="italic font-serif lowercase text-sm text-[#8C6D53]">by</span>
                        <span className="text-[#3D2F24]">{educator}</span>
                        <div className="h-3 w-px bg-[#E6DFD5]" />
                        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-[#8C6D53]" />{students.length || 0} enrolled</span>
                        <div className="h-3 w-px bg-[#E6DFD5]" />
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#8C6D53]" />{formatTotalHours(duration)}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default CourseHeader