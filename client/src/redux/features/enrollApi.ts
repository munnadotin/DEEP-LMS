import ENDPOINTS from "@/api/ENDPOINTS";
import { baseApi } from "../services/baseApi";
import { Enrollment } from "@/types/Enroll.type";

type Props = {
    data: Enrollment[];
}

const enrollReducer = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEnrollments: builder.query<Props, void>({
            query: () => ({
                url: ENDPOINTS.Enrollment.GET_ALL,
                method: "GET"
            }),
            providesTags: ["Enrollment"]
        }),
        // Create Enrollment
        createEnrollment: builder.mutation({
            query: (courseId: string) => ({
                url: ENDPOINTS.Enrollment.CREATE_ENROLLMENT(courseId),
                method: "POST"
            }),
            invalidatesTags: ["Enrollment", "Auth", "Course"]
        }),
        // Verify Enrollment
        verifyEnrollment: builder.mutation({
            query: (paymentData) => ({
                url: ENDPOINTS.Enrollment.VERIFY_ENROLLMENT,
                method: "POST",
                body: paymentData,
            }),
            invalidatesTags: ["Enrollment", "Auth", "Course"]
        }),
        // Update course Progress
        updateProgress: builder.mutation({
            query: ({ courseId, lessonId }) => ({
                url: ENDPOINTS.Enrollment.UPDATE_ENROLLMENT_BY_ID(courseId, lessonId),
                method: "PATCH"
            }),
            invalidatesTags: ["Enrollment", "Course"]
        }),
        // Update watching course
        watching: builder.mutation({
            query: (courseId) => ({
                url: ENDPOINTS.Enrollment.CONTINUE_WATCH_COURSE(courseId),
                method: "PATCH"
            }),
            invalidatesTags: ["Enrollment"]
        })
    }),
})

export const { useGetAllEnrollmentsQuery, useCreateEnrollmentMutation, useVerifyEnrollmentMutation, useUpdateProgressMutation, useWatchingMutation } = enrollReducer;