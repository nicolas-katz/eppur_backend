// Imports
const { Schema, model } = require('mongoose')

// Model
const cartSchema = new Schema({
    products: {
        type: Array,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

// Exports
module.exports = model('Cart', cartSchema)