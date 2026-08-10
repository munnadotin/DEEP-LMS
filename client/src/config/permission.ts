type Permission =
    | "dashboard"
    | "myLearnings"
    | "createCourse"
    | "myCourses"
    | "manageCategories";

type Role = "student" | "educator" | "admin";

export const permissions: Record<Role, Permission[]> = {
    student: [
        "myLearnings",
    ],

    educator: [
        "dashboard",
        "createCourse",
        "myCourses",
    ],

    admin: [
        "dashboard",
        "manageCategories",
    ],
} as const;