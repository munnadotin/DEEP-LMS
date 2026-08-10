export interface Enrollment {
    _id: string;
    completedLessons: [string];
    course: {
        _id: string;
        title: string;
        slug: string;
        description: string;
        price: number;
        thumbnail: {
            fileId: string;
            url: string;
        };
    };
    lastLessonCompleted: {
        _id: string;
        title: string;
    };
    paymentStatus: "paid" | "unpaid";
    user: string;
    progress: number;
    createdAt: string;
    updatedAt: string;
};