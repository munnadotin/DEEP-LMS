import ENDPOINTS from "@/api/ENDPOINTS";
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: "include",

    prepareHeaders: (headers) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("accessToken");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
        }

        return headers;
    }
})

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    //    Normal Api call 
    let result = await rawBaseQuery(args, api, extraOptions);
    const url = typeof args === "string" ? args : args.url;
    const accessToken = localStorage.getItem("accessToken");

    // if access token is expired
    if (accessToken && result.error?.status === 401 && url !== ENDPOINTS.Auth.REFRESH_TOKEN) {
        // Refresh Token Call
        const refreshResult = await rawBaseQuery({
            url: ENDPOINTS.Auth.REFRESH_TOKEN,
            method: "POST",
        }, api, extraOptions);

        // Refresh Success
        if (refreshResult.data) {
            const data = refreshResult.data as {
                accessToken: string;
            };

            localStorage.setItem("accessToken", data.accessToken);

            // Retry Original Request
            result = await rawBaseQuery(args, api, extraOptions);
        } else {
            // Refresh Failed
            localStorage.removeItem("accessToken");

            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }
    }
    return result;
}