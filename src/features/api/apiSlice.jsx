import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/posts',
            providesTags: ['Post'],
        }),
        addNewPost: builder.mutation({
            query: (payload) => ({
                url: '/posts',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }),
            invalidatesTags: ['Post']
        }),
        updatePost: builder.mutation({
            query: (payload) => {
                const { id, ...body } = payload
                console.log(payload);
                return {
                    url: `/posts/${payload.id}`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: ['Post']
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: ['Post']
        })
    })
})

export const {
    useGetPostsQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation
} = apiSlice