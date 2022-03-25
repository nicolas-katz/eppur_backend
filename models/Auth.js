// Imports
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Model
const AuthSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean
    }
}, {
    timestamps: true,
    versionKey: false
})

// Encryping password
AuthSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
AuthSchema.methods.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

// Exports
module.exports = mongoose.model('Auth', AuthSchema)