import { apiSlice } from "../../app/api/apiSlice"

export const managementApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllCustomers: builder.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "management/customers",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Customers"]
        }),
        getActiveCustomers: builder.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "management/actives",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Customers"]
        }),
        getMemberCustomers: builder.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "management/members",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Customers"]
        })
    }) 
})

export const {
    useGetAllCustomersQuery,
    useGetActiveCustomersQuery,
    useGetMemberCustomersQuery
} = managementApiSlice 