import ENDPOINTS from "@/api/ENDPOINTS";
import { baseApi } from "../services/baseApi";

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
        })
    })
})


export const { useLoginMutation, useRegisterUserMutation, useGetMeQuery, useLogOutMutation, useVerifyAccountQuery } = authReducer;