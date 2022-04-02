// Imports
const mongoose = require('mongoose')

// Model
const outfitsSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

// Exports
module.exports = mongoose.model('Outfit', outfitsSchema)