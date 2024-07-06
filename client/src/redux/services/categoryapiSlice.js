import {apiSlice} from './apiSlice'

const categoryApiSclice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query:()=>'/api/category/categories',
        }),
        createCategory:builder.mutation({
            query: ({name}) => ({
             url:'/api/category',
             method:"POST",
             body: {name}
            })
        })
    })
})
export const {useCreateCategoryMutation,useGetCategoriesQuery} = categoryApiSclice