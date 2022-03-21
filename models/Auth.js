// Imports
const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

// Model
const AuthSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
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
    isAdmin: false
}, {
    timestamps: true,
    versionKey: false
})

// Encryping password
AuthSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
AuthSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

// Exports
module.exports = model('Auth', AuthSchema)