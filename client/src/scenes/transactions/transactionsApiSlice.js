import { apiSlice } from "../../app/api/apiSlice"

export const transactionsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTransactions: builder.query({
            query: () => ({
                url: "transactions"
            }),
            providesTags: ["Transactions"]
        })
    })

})

export const {
    useGetTransactionsQuery
} = transactionsApiSlice 