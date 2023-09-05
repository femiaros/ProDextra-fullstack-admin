import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const API = 'https://prodextra-backend.onrender.com/'

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ baseUrl: API }),
    tagTypes: [ 
        "Dashboard",
        "Customers",
        "Transactions",
        "Analytics"
    ],
    endpoints: builder => ({})
})