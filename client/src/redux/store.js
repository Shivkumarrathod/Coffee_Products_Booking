import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import { apiSlice } from './services/apiSlice'
import authReducer from './feauter/auth/authSlice'

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
    },
    middleware: (getDefaultMiddlerware)=>
        getDefaultMiddlerware().concat(apiSlice.middleware),
    devTools:true
})
setupListeners(store.dispatch)