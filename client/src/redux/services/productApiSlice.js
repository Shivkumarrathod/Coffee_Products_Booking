import {apiSlice} from './apiSlice'

const productApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/api/product/getProduct',
        }),
        createProduct:builder.mutation({
            query: ({name,image,description,brand,quantity,stock,category,price}) => ({
                url: '/api/product',
                method:"POST",
                body:{name,image,description,brand,quantity,stock,category,price}
            })
        }),
        getProductById:builder.query({
            query:(id)=>({
                url:`/api/product/products/${id}`,
            })
        }),
        getLatestProduct:builder.query({
            query:()=>('/api/product/recentproduct'),
        })
    })
})
export const {
useGetProductsQuery,
useCreateProductMutation,
useGetProductByIdQuery,
useGetLatestProductQuery
} = productApiSlice