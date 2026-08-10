import ENDPOINTS from "@/api/ENDPOINTS";
import { baseApi } from "../services/baseApi";
import { Lesson } from "@/types/Course.type";

type GetAllLessons = {
    lessons: Lesson[]
}

const lessonReducer = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // create lesson
        createLesson: builder.mutation({
            query: ({ courseId, chapterId, data }) => ({
                url: ENDPOINTS.Lesson.CREATE_LESSON(courseId, chapterId),
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Course"]
        }),
        // get all lessons
        getAllLessons: builder.query<GetAllLessons, any>({
            query: ({ courseId, chapterId }) => ({
                url: ENDPOINTS.Lesson.GET_ALL(courseId, chapterId),
                method: "GET"
            }),
            providesTags: ["Course"]
        }),
        // get lesson by id
        getLessonById: builder.query<Lesson, any>({
            query: ({ courseId, chapterId, lessonId }) => ({
                url: ENDPOINTS.Lesson.GET_LESSON_BY_ID(courseId, chapterId, lessonId),
                method: "GET",
            }),
            providesTags: ["Course"]
        }),
        // Delete lesson by id
        deleteLessonById: builder.mutation({
            query: ({ courseId, chapterId, lessonId }) => ({
                url: ENDPOINTS.Lesson.DELETE_LESSON_BY_ID(courseId, chapterId, lessonId),
                method: "DELETE"
            }),
            invalidatesTags: ["Course"]
        }),
        // Update lesson by id
        updateLessonById: builder.mutation<Lesson, any>({
            query: ({ courseId, chapterId, lessonId, data }) => ({
                url: ENDPOINTS.Lesson.UPDATE_LESSON_BY_ID(courseId, chapterId, lessonId),
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Course"]
        })
    })
});


export const { useCreateLessonMutation, useGetAllLessonsQuery, useGetLessonByIdQuery, useDeleteLessonByIdMutation, useUpdateLessonByIdMutation } = lessonReducer;