type Permission =
    | "dashboard"
    | "myLearnings"
    | "createCourse"
    | "users"
    | "myCourses"
    | "applyForEducatorRole"
    | "manageCategories";

type Role = "student" | "educator" | "admin";

export const permissions: Record<Role, Permission[]> = {
    student: [
        "myLearnings",
        "applyForEducatorRole"
    ],

    educator: [
        "dashboard",
        "createCourse",
        "myCourses",
    ],

    admin: [
        "dashboard",
        "manageCategories",
        "users"
    ],
} as const;