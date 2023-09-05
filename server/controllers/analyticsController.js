const Transaction = require('../models/Transaction')
const Customer = require('../models/Customer')

const getAnalyticsStats = async (req, res) => {
    try {
        /* Hardcoded Values */
        const currentDay = new Date("2023-12-30") // Sat 30 Dec 2023
        const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
        const weekProductViews = 2156

        /* All Transactions Recent-Oldest */
        const transactions = await Transaction.find()
        .sort({ closedAt: -1 }).lean()
        /*  All Customer */
        const customers = await Customer.find().select(['-password','-__v']).lean()

        /* Current Week Transactions */
        const currentWeekTransactions = transactions.filter(({closedAt})=>{
            const month = new Date(closedAt).getMonth() + 1
            return parseInt(month) === currentDay.getMonth() + 1
        }).filter(({closedAt})=>{
            const day = new Date(closedAt)
            return day >= new Date("2023-12-24") && day <= currentDay
        })

        /* Previous Week Transactions */
        const previousWeekTransactions = transactions.filter(({closedAt})=>{
            const month = new Date(closedAt).getMonth() + 1
            return parseInt(month) === currentDay.getMonth() + 1
        }).filter(({closedAt})=>{
            const day = new Date(closedAt)
            return day >= new Date("2023-12-17") && day <= new Date("2023-12-23")
        })
        /* Fxn To Generate Sales Line */
        const generateWeekDaySalesData = (weekTransactions)=>{

            const weekDaySalesData = weekTransactions.reduce((acc,{cost,closedAt})=>{
                if(new Date(closedAt).getDay() === 0){
                    acc[0].y+=Math.round(cost)
                }
                if(new Date(closedAt).getDay() === 1){
                    acc[1].y+=Math.round(cost)
                }
                if(new Date(closedAt).getDay() === 2){
                    acc[2].y+=Math.round(cost)
                }
                if(new Date(closedAt).getDay() === 3){
                    acc[3].y+=Math.round(cost)
                }
                if(new Date(closedAt).getDay() === 4){
                    acc[4].y+=Math.round(cost)
                }
                if(new Date(closedAt).getDay() === 5){
                    acc[5].y+=Math.round(cost)
                }
                if(new Date(closedAt).getDay() === 6){
                    acc[6].y+=Math.round(cost)
                }

                return acc
            }, [
                {
                    "x": `${weekDays[0]}`,
                    "y": 0
                },
                {
                    "x": `${weekDays[1]}`,
                    "y": 0
                },
                {
                    "x": `${weekDays[2]}`,
                    "y": 0
                },
                {
                    "x": `${weekDays[3]}`,
                    "y": 0
                },
                {
                    "x": `${weekDays[4]}`,
                    "y": 0
                },
                {
                    "x": `${weekDays[5]}`,
                    "y": 0
                },
                {
                    "x": `${weekDays[6]}`,
                    "y": 0
                }
            ])

            return weekDaySalesData
        }

        const currentWeekSalesLine = {
            id: "currentWeek",
            data: generateWeekDaySalesData(currentWeekTransactions)
        }
        const previousWeekSalesLine = {
            id: "previousWeek",
            data: generateWeekDaySalesData(previousWeekTransactions)
        }
        /* Current Week Net Sales Income */
        const currentWeekNetSales = currentWeekTransactions.reduce((acc,{cost})=>{
            acc +=cost
            return acc
        }, 0)
        /* No of Sold Products in Current Week */
        const weekSoldProducts = currentWeekTransactions.reduce((acc,{productsCount})=>{
            acc +=productsCount
            return acc
        }, 0)
        /* Transactions in Current Week */
        const weekTransactionCount = currentWeekTransactions.reduce((acc,trans)=>{
            if(trans){
                acc +=1
            }
            return acc
        }, 0)

        /* Choropleth-Chart Country Data */
        const mappedLocations = customers.reduce((acc, { country }) => {
            if (!acc[country]) {
                acc[country] = 0
            }
            acc[country]++
            return acc
        }, {})
        const customersCountryData = Object.entries(mappedLocations).map(
            ([country, count]) => {
                return { id: country, value: count }
            }
        )
        /* Bar-Chart Country Data */
        const customersCountryBar = Object.entries(mappedLocations).map(
            ([countryName, count]) => {
                return { country: countryName, total: count }
            }
        )


        res.status(200).json({
            currentWeekNetSales,
            weekProductViews,
            weekSoldProducts,
            weekTransactionCount,
            currentWeekSalesLine,
            previousWeekSalesLine,
            customersCountryData,
            customersCountryBar
        })
        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = {
    getAnalyticsStats
}