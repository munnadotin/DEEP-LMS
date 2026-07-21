export interface Chapter {
    _id: string;
    title: string;
    position: number;
    lessons: [Lesson];
}[];

export interface Lesson {
    _id: string;
    chapter: string;
    createdAt: number;
    duration: number;
    isFree: boolean;
    resources: [string]
    title: string;
    updatedAt: string;
    video: {
        url: string;
        _id: string;
    }
}