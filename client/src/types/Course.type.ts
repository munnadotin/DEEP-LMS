export interface Course {
    _id: string;
    title: string;
    description: string;
    slug: string;
    duration: number;
    educator: {
        _id: string;
        name: string;
    };
    enrolledStudents: [string];
    categoryId: string;
    language: string;
    averageRating: number;
    price: number;
    level: string;
    thumbnail: {
        fileId: string;
        url: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface GetCourse extends Course {
    chapters: [Chapter];
    isEnrolled: boolean;
    review: [Review];
}

export interface Chapter {
    _id: string;
    title: string;
    position: number;
    lessons: [Lesson];
}

export interface Review {
    _id: string;
    courseId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    user: {
        _id: string;
        name: string;
    }
}

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

export interface CreateCourse {
    title: string;
    description: string;
    category: string;
    price: number;
    level: "beginner" | "intermediate" | "advanced";
    language: string;
    thumbnail: any;
}

export interface EducatorDashboard {
    totalCourses: number,
    totalStudents: number,
    publishedCourse: number,
    draftCoures: number,
    totalDuration: number,
    recentCourses: [Course],
    revenue: []
}

export interface AdminDashboard {
    pendingEducatorApplications: number,
    revenue: { _id: null, totalEnrollments: number, totalRevenue: number },
    totalCourses: number,
    totalEducators: number,
    totalEnrollments: number,
    totalStudents: number,
}