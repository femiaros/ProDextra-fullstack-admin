const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        publishDate:{
            type: Date,
            required: true
        },
        totalUnitSold:Number,
        category:String,
        variants: Number,
        rating: Number,
        coverImage: String,
    }
)

module.exports = mongoose.model('Product', productSchema)
