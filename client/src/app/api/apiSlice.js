import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7500' }),
    tagTypes: [ 
        "Dashboard",
        "Customers",
        "Transactions",
        "Analytics"
    ],
    endpoints: builder => ({})
})