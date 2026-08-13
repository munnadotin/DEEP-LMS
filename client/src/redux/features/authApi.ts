import ENDPOINTS from "@/api/ENDPOINTS";
import { baseApi } from "../services/baseApi";
import { UserApplication } from "@/types/User.type";

type ApplicationType = {
    applications: UserApplication[]
}

export const authReducer = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: ENDPOINTS.Auth.LOGIN,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auth"],
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: ENDPOINTS.Auth.REGISTER,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auth"],
        }),
        getMe: builder.query<any, void>({
            query: () => ({
                url: ENDPOINTS.Auth.GET_ME,
                method: "GET",
            }),
            providesTags: ["Auth"],
        }),
        logOut: builder.mutation<any, void>({
            query: () => ({
                url: ENDPOINTS.Auth.LOGOUT,
                method: "POST",
                invalidatesTags: ["Auth"],
            })
        }),
        verifyAccount: builder.query({
            query: (token: string) => ({
                url: ENDPOINTS.Auth.VERIFY_EMAIL(token),
                method: "GET",
            }),
            providesTags: ["Auth"]
        }),
        // get all applications
        getApplications: builder.query<ApplicationType, void>({
            query: () => ({
                url: ENDPOINTS.Admin.GET_APPLICATIONS,
                method: "GET",
            }),
            providesTags: ["Auth"]
        }),
        // approve user application
        approveApplication: builder.mutation({
            query: (id: string) => ({
                url: ENDPOINTS.Admin.APPROVE_APPLICATIONS(id),
                method: "PATCH",
            }),
            invalidatesTags: ["Auth"]
        }),
        // reject user application
        rejectApplication: builder.mutation({
            query: ({ id, data }) => ({
                url: ENDPOINTS.Admin.REJECT_APPLICATIONS(id),
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Auth"]
        }),
        // apply for educator role
        applyEducator: builder.mutation({
            query: (data: { headline: string, bio: string }) => ({
                url: ENDPOINTS.Student.APPLY_FOR_EDUCATOR,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Auth"]
        }),
        // check application status
        checkApplication: builder.query<any, void>({
            query: () => ({
                url: ENDPOINTS.Student.CHECK_APPLICATION,
                method: "GET",
            }),
            providesTags: ["Auth"]
        })
    })
})


export const { useLoginMutation, useRegisterUserMutation, useGetMeQuery, useLogOutMutation, useVerifyAccountQuery, useGetApplicationsQuery, useApproveApplicationMutation, useRejectApplicationMutation, useApplyEducatorMutation, useCheckApplicationQuery } = authReducer;