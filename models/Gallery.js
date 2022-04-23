const mongoose = require('mongoose')

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

module.exports = mongoose.model('Gallery', gallerySchema)