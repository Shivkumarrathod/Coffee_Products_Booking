import {apiSlice} from './apiSlice'

const cartApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        addToCart:builder.mutation({
            query:({product,user})=>({
                url:'/api/cart',
                method:"POST",
                body:{product,user}
            })
        }),
        getAllUserproducts:builder.query({
            query:(user)=>({
                url:`/api/cart/getproduct/${user}`,
            })
        }),
        deleteCartProduct:builder.mutation({
            query:({_id})=>({
                url:'/api/cart/deletecart',
               method:"DELETE",
               body:{_id}
            })
        }),
    })
})
export const {useAddToCartMutation,useGetAllUserproductsQuery,useDeleteCartProductMutation} = cartApiSlice