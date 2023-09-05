const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
    {
        customerId: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        },
        productsCount:{
            type: Number,
            required: true
        },
        products: {
            type: [mongoose.Types.ObjectId],
            ref: "Product"
        },
        closedAt:{
            type: Date,
            required: true
        }
    }
)

module.exports = mongoose.model('Transaction', transactionSchema)