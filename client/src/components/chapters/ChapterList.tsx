"use client"

import { useDeleteChapterByIdMutation, useGetChapterQuery } from "@/redux/features/chapterApi"
import { Layers, Plus, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import ChapterForm from "../forms/CreateChapterForm";
import Link from "next/link";

type ChapterType = {
    _id: string;
    title: string;
    position: number;
}

function ChapterList({ courseId }: { courseId: string }) {
    const { data } = useGetChapterQuery(courseId);
    const [activeModel, setActiveModel] = useState<boolean>(false);
    const [selectedChapter, setSelectedChapter] = useState<ChapterType | null>(null);
    const [deleteChapterById] = useDeleteChapterByIdMutation();

    if (!data) return;

    const handleEdit = (chapter: ChapterType) => {
        setSelectedChapter(chapter);
        setActiveModel(true);
    }

    return (
        <div className="max-w-2xl mx-auto p-6 text-[#3D2F24] rounded-xl border-[#E6DFD5] my-8">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E6DFD5] pb-4 mb-6">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D53] block mb-1">
                        Course Curriculum
                    </span>
                    <h2 className="text-xl font-serif font-medium">Chapter List</h2>
                </div>

                <button
                    onClick={() => {
                        setActiveModel(true);
                        setSelectedChapter(null);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#3D2F24] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-md hover:bg-[#2A2018] transition-colors cursor-pointer"
                >
                    <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                    Add Chapter
                </button>
            </div>

            {/* Chapter List */}
            {data.chapters.length > 0 ? (
                <div className="space-y-3">
                    {data.chapters.map((chapter: ChapterType) => (
                        <div
                            key={chapter._id}
                            className="bg-white border border-[#E6DFD5] p-4 rounded-lg flex items-center justify-between transition-colors hover:border-[#8C6D53]/40"
                        >
                            <div className="flex items-center gap-3">
                                {/* Position */}
                                <div className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#E6DFD5] flex items-center justify-center text-xs font-bold text-[#8C6D53] shrink-0">
                                    {chapter.position}
                                </div>

                                {/* Title */}
                                <Link href={`/educator/create-course/${courseId}/chapter/${chapter._id}`} className="text-xs font-medium text-[#3D2F24] line-clamp-1 cursor-pointer">
                                    {chapter.title}
                                </Link >
                            </div>

                            <div className="flex items-center gap-4">
                                {/* update chapter */}
                                <button onClick={() => { handleEdit(chapter) }} className="cursor-pointer">
                                    <SquarePen color="brown" strokeWidth={1.5} className="h-4 w-4" />
                                </button>
                                {/* delete chapter */}
                                <button onClick={() => deleteChapterById({ courseId, chapterId: chapter._id })} className="cursor-pointer">
                                    <Trash2 color="red" strokeWidth={1.5} className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="bg-white border border-dashed border-[#E6DFD5] rounded-lg p-10 text-center flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E6DFD5] flex items-center justify-center mb-3">
                        <Layers className="h-5 w-5 text-[#C2B7AC]" />
                    </div>

                    <h3 className="font-serif italic text-base text-[#6E5D4F] mb-1">
                        No Chapters Found
                    </h3>
                    <p className="text-xs text-[#A39281] max-w-xs mb-6">
                        You haven't added any chapters to this course yet. Get started by adding your first module.
                    </p>
                </div>
            )}
            {activeModel && <ChapterForm courseId={courseId} setActiveModel={setActiveModel} chapter={selectedChapter!} />}
        </div>
    );
}

export default ChapterList