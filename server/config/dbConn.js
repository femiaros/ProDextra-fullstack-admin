const mongoose = require('mongoose')
// const Customer = require('../models/Customer')
// const Product = require('../models/Product')
// const Transaction = require('../models/Transaction')
// const { dataCustomers,dataProducts,dataTransactions } = require('../data')

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        /* ONLY ADD DATA ONE TIME */
        // Customer.insertMany(dataCustomers)
        // Product.insertMany(dataProducts)
        // Transaction.insertMany(dataTransactions)
        // console.log(dataProducts.length)

    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB