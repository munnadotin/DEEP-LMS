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
        }),
        // create category
        createCategory: builder.mutation({
            query: (data) => ({
                url: ENDPOINTS.Category.CREATE_CATEGORY,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["category"]
        }),
        // delete category by id
        deleteCategory: builder.mutation({
            query: (slug: string) => ({
                url: ENDPOINTS.Category.DELETE_CATEGORY_BY_SLUG(slug),
                method: "DELETE",
            }),
            invalidatesTags: ["category"]
        }),
        // update category
        updateCategory: builder.mutation({
            query: ({ slug, data }) => ({
                url: ENDPOINTS.Category.UPDATE_CATEGORY_BY_SLUG(slug),
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["category"]
        })
    })
})

export const { useGetCategoryQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = categoryReducer;