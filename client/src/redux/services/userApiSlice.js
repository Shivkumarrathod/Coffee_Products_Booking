import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createUser:builder.mutation({
            query:({username,email,password})=>({
                url:'/api/users',
                method:"POST",
                body:{username,email,password}
            })
        }),
        loginUser:builder.mutation({
            query:({email,password})=>({
                url:'/api/users/auth',
                method:"POST",
                body:{email,password}
            })
        })
    })
})
export const {
    useCreateUserMutation,
    useLoginUserMutation
} = userApiSlice