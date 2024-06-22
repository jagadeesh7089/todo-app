import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginslice"
import { todosApi } from "../services/todosApi";
export const store= configureStore({
    reducer:{
        loginReducer,
        [todosApi.reducerPath]: todosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todosApi.middleware),
})