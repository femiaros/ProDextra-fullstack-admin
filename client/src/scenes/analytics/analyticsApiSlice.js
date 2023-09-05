import { apiSlice } from "../../app/api/apiSlice"
import { countries } from "country-data"

export const analyticsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAnalytics: builder.query({
            query: () => "analytics",
            transformResponse: responseData => {
            
                const accCurrentSalesLine = {
                    id: "currentWeek",
                    data: []
                }
                const accPreviousSalesLine = {
                    id: "previousWeek",
                    data: []
                }
                // *** Accumulation of Current SalesLine ***
                responseData.currentWeekSalesLine.data.reduce(
                    (acc, { x, y}) => {
                        const curCost = acc.cost + y

                        accCurrentSalesLine.data = [
                            ...accCurrentSalesLine.data,
                            { x , y: curCost }
                        ]

                        return { cost: curCost }
                    },
                    { cost: 0 }
                )
                // *** Accumulation of Previous SalesLine ***
                responseData.previousWeekSalesLine.data.reduce(
                    (acc, { x, y}) => {
                        const curCost = acc.cost + y

                        accPreviousSalesLine.data = [
                            ...accPreviousSalesLine.data,
                            { x , y: curCost }
                        ]

                        return { cost: curCost }
                    },
                    { cost: 0 }
                )

                // *** Add Country Names to Data ***
                const dateFormatted = responseData.customersCountryBar.map(item=>{
                    return {
                        ...item,
                        country: countries[item.country].name=== 'United Kingdom' ? 'UK' 
                        :countries[item.country].name=== 'United States'? 'USA' : countries[item.country].name
                    }
                })
                
                return {
                    ...responseData,
                    customersCountryBar: dateFormatted,
                    accSalesLine: [accCurrentSalesLine,accPreviousSalesLine]
                }
            },
            providesTags: ["Analytics"]
        })
    }) 
})

export const {
    useGetAnalyticsQuery
} = analyticsApiSlice