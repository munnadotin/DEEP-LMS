import ENDPOINTS from "@/api/ENDPOINTS";
import { baseApi } from "../services/baseApi";
import { Course } from "@/types/Course.type";

interface SearchParams {
    search?: string;
    category?: string;
    page?: number;
    limit?: number;
    sort?: string;
    level?: string;
}

type Pagination = {
    courses: Course[],
    pagination: {
        hasNextPage: boolean;
        hasPrevPage: boolean;
        limit: string | number;
        page: string | number;
        totalCourse: number;
        totalPages: number;
    }
}

const searchReducer = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        search: builder.query<Pagination, SearchParams>({
            query: ({ search, category, level, sort, page, limit }) => ({
                url: ENDPOINTS.Search.SEARCH_ALL,
                method: "GET",
                params: {
                    search,
                    category,
                    level,
                    sort,
                    page,
                    limit,
                },
            }),
            providesTags: ["Search"],
        }),
    })
})

export const { useSearchQuery } = searchReducer;
