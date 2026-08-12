import { AdminDashboard, Course, EducatorDashboard, GetCourse } from "@/types/Course.type";
import { baseApi } from "../services/baseApi";
import ENDPOINTS from "@/api/ENDPOINTS";

type course = {
    course: GetCourse;
}

type DraftCourse = {
    courses: Course[];
}

type EduDashboard = {
    data: EducatorDashboard
}

type AdmDashboard = {
    data: AdminDashboard
}

const courseReducer = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all courses
        getAllCourses: builder.query<any, void>({
            query: () => ({
                url: ENDPOINTS.Course.GET_ALL,
                method: "GET",
            }),
            providesTags: ["Course"],
        }),
        // get all draft course
        getAllDraftCourse: builder.query<DraftCourse, void>({
            query: () => ({
                url: ENDPOINTS.Course.GET_DRAFT_COURSE,
                method: "GET"
            }),
            providesTags: ["Course"]
        }),
        // get course by id
        getCourseBySlug: builder.query<course, string>({
            query: (slug: string) => ({
                url: ENDPOINTS.Course.GET_COURSE_BY_SLUG(slug),
                method: "GET",
            }),
            providesTags: ["Course"],
        }),
        // create course
        createCourse: builder.mutation({
            query: (data) => ({
                url: ENDPOINTS.Course.CREATE_COURSE,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Course"]
        }),
        // delete course by slug
        deleteCourseBySlug: builder.mutation({
            query: (id: string) => ({
                url: ENDPOINTS.Course.DELETE_COURSE_BY_ID(id),
                method: "DELETE"
            }),
            invalidatesTags: ["Course"]
        }),
        // update course by id
        updateCourseById: builder.mutation({
            query: ({ courseId, data }) => ({
                url: ENDPOINTS.Course.UPDATE_COURSE_BY_ID(courseId),
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Course"]
        }),
        // educator dashboard
        educatorDashboard: builder.query<EduDashboard, void>({
            query: () => ({
                url: ENDPOINTS.Course.GET_EDUCATOR_DASHBOARD,
                method: "GET",
            }),
            providesTags: ["Course"]
        }),
        // admin dashboard
        adminDashboard: builder.query<AdmDashboard, void>({
            query: () => ({
                url: ENDPOINTS.Admin.DASHBOARD,
                method: "GET",
            }),
            providesTags: ["Course"]
        })
    }),
})

export const { useGetAllCoursesQuery, useGetAllDraftCourseQuery, useGetCourseBySlugQuery, useCreateCourseMutation, useDeleteCourseBySlugMutation, useUpdateCourseByIdMutation, useEducatorDashboardQuery, useAdminDashboardQuery } = courseReducer;
