const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["pantalones", "remeras", "buzos", "bermudas", "boinas", "accesorios"]
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
        enum: ["negro", "blanco", "gris", "beige"]
    },
    size: {
        type: String,
        required: true,
        enum: ["small", "medium", "large"]
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Product', productsSchema)