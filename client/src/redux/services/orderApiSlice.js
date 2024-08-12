import {apiSlice} from './apiSlice'

const productApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder:builder.mutation({
            query: ({product,user,toAddress,paymentMethod,paymentResult}) => ({
                url: '/api/order',
                method:"POST",
                body:{product,user,toAddress,paymentMethod,paymentResult}
            })
        }),
    })
})
export const {useCreateOrderMutation} = productApiSlice
