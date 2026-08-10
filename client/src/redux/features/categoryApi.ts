import ENDPOINTS from "@/api/ENDPOINTS";
import { baseApi } from "../services/baseApi";

type Props = {
    categories: {
        _id: string;
        name: string;
        slug: string;
    }[]
}

const categoryReducer = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get Category
        getCategory: builder.query<Props, void>({
            query: () => ({
                url: ENDPOINTS.Category.GET_ALL,
                method: "GET",
            }),
            providesTags: ["category"]
        })
    })
})

export const { useGetCategoryQuery } = categoryReducer;