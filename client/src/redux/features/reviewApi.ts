import ENDPOINTS from "@/api/ENDPOINTS";
import { baseApi } from "../services/baseApi";

const reviewReducer = baseApi.injectEndpoints({
    endpoints: builder => ({
        // create review
        createReview: builder.mutation({
            query: ({ courseId, data }) => ({
                url: ENDPOINTS.Review.CREATE_REVIEW(courseId),
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Course", "review"]
        }),
        // get all reviews by courseId
        getAllReviewsByCourseId: builder.query({
            query: (courseId: string) => ({
                url: ENDPOINTS.Review.GET_ALL_REVIEWS_BY_COURSE_ID(courseId),
                method: "GET"
            }),
            providesTags: ["Course", "review"]
        }),
        // update review
        updateReviewById: builder.mutation({
            query: ({ courseId, reviewId, data }) => ({
                url: ENDPOINTS.Review.UPDATE_REVIEW_BY_ID(courseId, reviewId),
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Course", "review"]
        }),
        // delete review
        deleteReviewById: builder.mutation({
            query: ({ courseId, reviewId }) => ({
                url: ENDPOINTS.Review.DELETE_REVIEW_BY_ID(courseId, reviewId),
                method: "DELETE"
            }),
            invalidatesTags: ["Course", "review"]
        })
    })
})

export const { useCreateReviewMutation, useGetAllReviewsByCourseIdQuery, useUpdateReviewByIdMutation, useDeleteReviewByIdMutation } = reviewReducer;