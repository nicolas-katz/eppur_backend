// Imports
const mongoose = require('mongoose')

// Model
const gallerySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

// Exports
module.exports = mongoose.model('Gallery', gallerySchema)