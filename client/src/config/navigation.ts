import { Library, LayoutDashboard, BookOpen, FolderTree, SquareMousePointer, User } from "lucide-react";

type Permission =
    | "dashboard"
    | "applyForEducatorRole"
    | "users"
    | "myLearnings"
    | "createCourse"
    | "myCourses"
    | "manageCategories";

type NavItem = {
    label: string;
    href: string | ((role: string) => string);
    icon: any;
    permission: Permission;
};

export const navigation: NavItem[] = [
    {
        label: "Dashboard",
        href: (role: string) => `/${role}/dashboard`,
        icon: LayoutDashboard,
        permission: "dashboard",
    },

    {
        label: "My Learnings",
        href: "/my-learnings",
        icon: Library,
        permission: "myLearnings",
    },
    {
        label: "Users",
        href: "/admin/users",
        icon: User,
        permission: "users"
    },
    {
        label: "Become Educator",
        href: "/apply",
        icon: SquareMousePointer,
        permission: "applyForEducatorRole"
    },

    {
        label: "Create Course",
        href: "/educator/create-course",
        icon: BookOpen,
        permission: "createCourse",
    },

    {
        label: "My Courses",
        href: "/educator/my-courses",
        icon: BookOpen,
        permission: "myCourses",
    },

    {
        label: "Categories",
        href: "/admin/categories",
        icon: FolderTree,
        permission: "manageCategories",
    },
];