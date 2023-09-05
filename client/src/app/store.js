import { configureStore } from "@reduxjs/toolkit"
import globalReducer from "./api/globalSlice"
import { apiSlice } from "./api/apiSlice"
import { setupListeners } from "@reduxjs/toolkit/query"

export const store = configureStore({
    reducer: {
        global: globalReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false
})

setupListeners(store.dispatch)