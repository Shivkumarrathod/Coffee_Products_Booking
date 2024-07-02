import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    // reducerPath:"Coffee_products",
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:7000'}),
    tagTypes:["User","Product","Order"],
    endpoints:()=>({})
  })