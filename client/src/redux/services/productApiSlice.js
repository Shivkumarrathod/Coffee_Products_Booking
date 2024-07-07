import {apiSlice} from './apiSlice'

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/api/product/allproduct',
        }),
        createProduct:builder.mutation({
            query:({name,description,image,stock,price,quantity,category,brand})=>({
                url:"/api/product",
                method:"POST",
                body:{name,description,image,stock,price,quantity,category,brand}
            })
        }),
        uploadImage:builder.mutation({
            query:(data)=>({
                url:"/api/upload",
                method:"POST",
                body:data
            })
        })
    })
})
export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useUploadImageMutation,
} = productApiSlice