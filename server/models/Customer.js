const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        roles: {
            type: [String],
            default: ["user"]
        },
        active: {
            type: Boolean,
            default: true
        },
        createdAt:{
            type: Date,
            required: true
        },
        transactions: {
            type: [mongoose.Types.ObjectId],
            ref: "Transaction"
        },
        company: String,
        phone: String,
        avatar: String,
    },
    {timestamps: true }
)

module.exports = mongoose.model('Customer', customerSchema)