import {apiSlice} from './apiSlice'

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/api/product/allproduct',
        }),
        createProduct:builder.mutation({
            query:(product)=>({
                url:"/api/product",
                method:"POST",
                body:product
            })
        })
    })
})
export const {
  useCreateProductMutation,
  useGetProductsQuery,
} = productApiSlice