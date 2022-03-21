// Imports
const mongoose = require('mongoose')

// Model
const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageURL: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    sizes: {
        type: Array,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

// Exports
module.exports = mongoose.model('Product', productsSchema)