// Imports
const Auth = require('../models/Auth')
const jwt = require('jsonwebtoken')

// Signup function
const signUp = async (req, res) => {
    const { name, lastName, phone, email, password, isAdmin } = req.body

    const newUser = new Auth({
        name,
        lastName,
        phone,
        email,
        password: Auth.encryptPassword(password),
        isAdmin
    })

    const savedUser = await newUser.save()

    const token = jwt.sign({id: savedUser}, 'authUser', {
        expiresIn: 604800
    })

    res.status(200).json({token})
}

// Login function
const logIn = async (req, res) => {

    if(req.body.email === 'eppur@gmail.com') {
        Auth.isAdmin = true
    }

    const userFound = await Auth.findOne({email: req.body.email})
    if(!userFound) return res.status.json({message: 'User not found'})

    const matchPassword = await Auth.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'})

    jwt.sign({id: userFound}, 'authUser', {
        expiresIn: 604800
    })
    
    res.json({token})
}

// Create user function
const createUser = (req, res) => {

}

// Update user function
const updateUserById = (req, res) => {
    
}

// Delete user function
const deleteUserById = (req, res) => {
    
}

// Exports
module.exports = {
    signUp,
    logIn,
    createUser,
    updateUserById,
    deleteUserById
}