const ENDPOINTS = {
    // Authentication Endpoints
    Auth: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        VERIFY_EMAIL: (token: string) => `/auth/verify?token=${token}`,
        GET_ME: "/auth/me",
        REFRESH_TOKEN: "/auth/refresh-access-token",
        LOGOUT: "/auth/logout",
    },
    // Admin Endpoints
    Admin: {
        DASHBOARD: "/admin/dashboard",
        GET_APPLICATIONS: "/admin/applications",
        APPROVE_APPLICATIONS: (id: string) => `/admin/educators/${id}/approve`,
        REJECT_APPLICATIONS: (id: string) => `/admin/educators/${id}/reject`,
    },
    // Student Endpoints
    Student: {
        APPLY_FOR_EDUCATOR: "/auth/educator/apply",
        CHECK_APPLICATION: "/auth/educator/application"
    },
    // Category Endpoints
    Category: {
        GET_ALL: "/category",
        GET_CATEGORY_BY_SLUG: (slug: string) => `/category/${slug}`,
        CREATE_CATEGORY: "/category",
        UPDATE_CATEGORY_BY_SLUG: (slug: string) => `/category/${slug}`,
        DELETE_CATEGORY_BY_SLUG: (slug: string) => `/category/${slug}`,
    },
    // Course Endpoints
    Course: {
        GET_ALL: "/course/all",
        GET_ALL_COURSES_BY_EDUCATOR: "/course",
        GET_DRAFT_COURSE: "/course/draft",
        GET_COURSE_BY_SLUG: (slug: string) => `/course/${slug}`,
        CREATE_COURSE: "/course/create",
        UPDATE_COURSE_BY_ID: (id: string) => `/course/${id}`,
        DELETE_COURSE_BY_ID: (id: string) => `/course/${id}`,
        GET_EDUCATOR_DASHBOARD: "/course/educator/dashboard"
    },
    // Chapter Endpoints
    Chapter: {
        GET_ALL: (courseId: string) => `/course/${courseId}/chapter`,
        CREATE_CHAPTER: (courseId: string) => `/course/${courseId}/chapter/create`,
        UPDATE_CHAPTER_BY_SLUG: (courseId: string, chapterId: string) => `/course/${courseId}/chapter/${chapterId}`,
        DELETE_CHAPTER_BY_SLUG: (courseId: string, chapterId: string) => `/course/${courseId}/chapter/${chapterId}`,
    },
    // Lesson Endpoints
    Lesson: {
        GET_ALL: (courseId: string, chapterId: string) => `/course/${courseId}/chapter/${chapterId}/lesson`,
        GET_LESSON_BY_ID: (courseId: string, chapterId: string, lessonId: string) => `/course/${courseId}/chapter/${chapterId}/lesson/${lessonId}`,
        CREATE_LESSON: (courseId: string, chapterId: string) => `/course/${courseId}/chapter/${chapterId}/lesson/create`,
        UPDATE_LESSON_BY_ID: (courseId: string, chapterId: string, lessonId: string) => `/course/${courseId}/chapter/${chapterId}/lesson/${lessonId}`,
        DELETE_LESSON_BY_ID: (courseId: string, chapterId: string, lessonId: string) => `/course/${courseId}/chapter/${chapterId}/lesson/${lessonId}`,
    },
    // Enrollment Endpoints
    Enrollment: {
        GET_ALL: "/enroll",
        // create enrollment
        CREATE_ENROLLMENT: (courseId: string) => `/enroll/${courseId}`,
        // verify enrollment
        VERIFY_ENROLLMENT: `enroll/verify`,
        // update enroll progress
        UPDATE_ENROLLMENT_BY_ID: (courseId: string, lessonId: string) => `/enroll/${courseId}/${lessonId}/progress`,
        // continue watch course
        CONTINUE_WATCH_COURSE: (courseId: string) => `/enroll/${courseId}/continue`,
    },
    // Search Endpoints
    Search: {
        SEARCH_ALL: "/course",
    },
    // Review Endpoints
    Review: {
        GET_ALL_REVIEWS_BY_COURSE_ID: (courseId: string) => `/course/${courseId}/reviews`,
        CREATE_REVIEW: (courseId: string) => `/course/${courseId}/reviews`,
        UPDATE_REVIEW_BY_ID: (courseId: string, reviewId: string) => `/course/${courseId}/review/${reviewId}`,
        DELETE_REVIEW_BY_ID: (courseId: string, reviewId: string) => `/course/${courseId}/review/${reviewId}`,
    }
}

export default ENDPOINTS