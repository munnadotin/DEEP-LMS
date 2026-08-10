import ENDPOINTS from "@/api/ENDPOINTS";
import { baseApi } from "../services/baseApi";

const chapterReducer = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create Chapter
        createChapter: builder.mutation({
            query: ({ courseId, data }) => ({
                url: ENDPOINTS.Chapter.CREATE_CHAPTER(courseId),
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Course"]
        }),
        // get chapters
        getChapter: builder.query({
            query: (courseId: string) => ({
                url: ENDPOINTS.Chapter.GET_ALL(courseId),
                method: "GET"
            }),
            providesTags: ["Course"]
        }),
        // delete chapterById
        deleteChapterById: builder.mutation({
            query: ({ courseId, chapterId }) => ({
                url: ENDPOINTS.Chapter.DELETE_CHAPTER_BY_SLUG(courseId, chapterId),
                method: "DELETE"
            }),
            invalidatesTags: ["Course"]
        }),
        // update chapterById
        updateChapterById: builder.mutation({
            query: ({ courseId, chapterId, data }) => ({
                url: ENDPOINTS.Chapter.UPDATE_CHAPTER_BY_SLUG(courseId, chapterId),
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Course"]
        })
    })
})

export const { useCreateChapterMutation, useGetChapterQuery, useDeleteChapterByIdMutation, useUpdateChapterByIdMutation } = chapterReducer;