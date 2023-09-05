const Transaction = require('../models/Transaction')
const Product = require('../models/Product')
const Customer = require('../models/Customer')

const getDashboardStats = async (req, res) => {
    try {
        /* Hardcoded Values */
        const currentMonth = 12 // Dec
        const monthRevenueTotal = 20550 
        const monthlySalesData = []
        const customerStats = {
            categories: [],
            activities:[]
        }
        const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']

        /* All Transactions Recent-Oldest */
        const transactions = await Transaction.find()
        .sort({ closedAt: -1 }).lean()
        /*  All Customer */
        const customers = await Customer.find().select(['-password','-__v']).lean()

        const yearSalesTotal = transactions.reduce((acc,{cost})=>{
            acc +=Math.round(cost)
            return acc
        }, 0)
        const yearProductsTotal = transactions.reduce((acc,{productsCount})=>{
            acc +=productsCount
            return acc
        }, 0)

        /* Dec Transactions */
        const decTransactions = transactions.filter(({closedAt})=>{
            let month = new Date(closedAt).getMonth() + 1
            return parseInt(month) === currentMonth
        })
        const monthSalesTotal = decTransactions.reduce((acc,{cost})=>{
            acc +=Math.round(cost)
            return acc
        }, 0)
        const monthProductsTotal = decTransactions.reduce((acc,{productsCount})=>{
            acc +=productsCount
            return acc
        }, 0)

        /* Recent Products Sold*/
        const productIds = decTransactions.reduce((acc,{products})=>{
            acc = [...acc,...products] 
            return acc
        }, [])

        const monthSoldProducts = await Promise.all(
            productIds.map(async (id) => {
                return await Product.findById(id).lean().exec()
            })
        )

        const generateMonthSalesData = (monthNum)=>{
            const firstThird = {
                weeks: `1-10 ${monthNames[(monthNum-1)]}`,
                first: 0,
                second: 0
            }
            const secondThird = {
                weeks: `11-20 ${monthNames[(monthNum-1)]}`,
                first: 0,
                second: 0
            }
            const lastThird = {
                weeks: `21-${monthNum===2?'28':'30'} ${monthNames[(monthNum-1)]}`,
                first: 0,
                second: 0
            }
            
            const monthTransactions = transactions.filter(({closedAt})=>{
                let month = new Date(closedAt).getMonth() + 1  
                return parseInt(month) === monthNum
            })
            // skip if array has no length
            monthTransactions.length && monthTransactions.forEach(transac => {
                const day = new Date(transac.closedAt).getDate()

                if(day<=5){
                    firstThird.first = Math.round(firstThird.first + transac.cost)
                }
                if(day>5 && day<=10){
                    firstThird.second = Math.round(firstThird.second + transac.cost)
                }
                if(day>10 && day<=15){
                    secondThird.first = Math.round(secondThird.first + transac.cost)
                }
                if(day>15 && day<=20){
                    secondThird.second = Math.round(secondThird.second + transac.cost)
                }
                if(day>20 && day<=25){
                    lastThird.first = Math.round(lastThird.first + transac.cost)
                }
                if(day>25 && day<=30){
                    lastThird.second = Math.round(lastThird.second + transac.cost)
                }
            })

            return [firstThird,secondThird,lastThird]
        }
        /* Monthly Sales Data Generation */
        for(let i=1;i<13;i++){
            monthlySalesData.push({month:monthNames[(i-1)],data: generateMonthSalesData(i)})
        }
        /* Customer Categories Data Generation */
        const categories = customers.reduce((acc,customer)=>{
            if(customer.roles.includes('member')){
                acc[0].value+=1
            } 
            if(!customer.roles.includes('member')){
                acc[1].value+=1
            }
            if(!customer.active){
                acc[2].value+=1
            }

            return acc
        }, [
            {
                "id": "member",
                "label": "member",
                "value": 0
            },
            {
                "id": "user",
                "label": "user",
                "value": 0
            },
            {
                "id": "inactive",
                "label": "inactive",
                "value": 0
            }
        ])
        customerStats.categories = categories

        /* Customer Activities Data Generation */
        const activities = transactions.reduce((acc,transaction)=>{
            const month = new Date(transaction.closedAt).getMonth() + 1  

            if(parseInt(month) === 6){
                acc[0].data[0].y+=Math.round(transaction.cost)
            }
            if(parseInt(month) === 7){
                acc[0].data[1].y+=Math.round(transaction.cost)
            }
            if(parseInt(month) === 8){
                acc[0].data[2].y+=Math.round(transaction.cost)
            }
            if(parseInt(month) === 9){
                acc[0].data[3].y+=Math.round(transaction.cost)
            }
            if(parseInt(month) === 10){
                acc[0].data[4].y+=Math.round(transaction.cost)
            }
            if(parseInt(month) === 11){
                acc[0].data[5].y+=Math.round(transaction.cost)
            }
            if(parseInt(month) === 12){
                acc[0].data[6].y+=Math.round(transaction.cost)
            }

            return acc
        }, [
            {
                "id": "customersActivity",
                "data": [
                    {
                        "x": "Jun",
                        "y": 0
                    },
                    {
                        "x": "Jul",
                        "y": 0
                    },
                    {
                        "x": "Aug",
                        "y": 0
                    },
                    {
                        "x": "Sept",
                        "y": 0
                    },
                    {
                        "x": "Oct",
                        "y": 0
                    },
                    {
                        "x": "Nov",
                        "y": 0
                    },
                    {
                        "x": "Dec",
                        "y": 0
                    } 
                ]
            } 
        ])
        customerStats.activities = activities


        res.status(200).json({
            monthRevenueTotal, 
            monthSalesTotal,
            monthProductsTotal,
            yearSalesTotal,
            yearProductsTotal,
            monthSoldProducts,
            monthlySalesData,
            customerStats,
        })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

module.exports = {
    getDashboardStats
}