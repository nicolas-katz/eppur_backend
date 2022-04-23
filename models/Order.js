const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userData: {
        email: { type: String, required: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        phone: { type: Number, required: true }
    },
    userID: {
        type: String,
        required: true
    },
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
    numOrder: {
        type: Number,
        required: true,
        default: 0
    },
    payment: {
        type: String,
        required: true
    },
    shipment: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    isPayed: {
        type: Boolean,
        required: true,
        default: false
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Order', orderSchema)