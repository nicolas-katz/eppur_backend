// Imports
const mongoose = require('mongoose')

// Model
const gallerySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default: "https://www.instagram.com/eppur_ind/"
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