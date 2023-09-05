import { apiSlice } from "../../app/api/apiSlice"

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDashboard: builder.query({
            query: () => "dashboard",
            transformResponse: responseData => {
                // *** Filtering last-10 sold Products for Dec ***
                const monthProductIds = responseData.monthSoldProducts.map(item=>item._id)

                const filteredIds = monthProductIds.filter((id,i)=> monthProductIds.indexOf(id)===i).filter((id,i)=> i<10)

                const RecentTenProducts = filteredIds.map(id=>{
                    return responseData.monthSoldProducts.find(product=>product._id===id)
                })
                
                return {...responseData,monthSoldProducts: RecentTenProducts}
            },
            providesTags: ["Dashboard"]
        })
    }) 
})

export const {
    useGetDashboardQuery
} = dashboardApiSlice 