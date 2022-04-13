// Imports
const { Schema, model } = require('mongoose')

// Model
const cartSchema = new Schema({
    products: [{
        _id: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        color: { type: String, required: true },
        image: { type: String, required: true },
        size: { type: String, required: true },
        stock: { type: Number, required: true, default: 0 },
        quantity: { type: Number, required: true, default: 1 },
        subtotal: { type: Number, required: true, default: 0 }
    }],  
    userEmail: { 
        type: String, 
        required: true 
    },
    userID: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
})

// Exports
module.exports = model('Cart', cartSchema)