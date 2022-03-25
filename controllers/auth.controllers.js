// Imports
const Auth = require('../models/Auth')
const passport = require('passport')
const config = require('../config')

// Signup function
const signUp = async (req, res) => {
    const { firstname, lastname, phone, email, password, confirmpassword, isAdmin } = req.body
    const errors = []
    if(password != confirmpassword) {
        errors.push({message: "Password do not match. Try again."})
    }
    if(errors.length > 0) {
        res.render('account/signup', {errors, firstname, lastname, phone, email, password, confirmpassword})
    } else {
        const emailUser = await Auth.findOne({email: email})
        if(emailUser) {
            errors.push({message: "Email is already exists."})
            res.render('account/signup', {errors, firstname, lastname, phone, email, password, confirmpassword})
        }
        const newUser = await new Auth({firstname, lastname, phone, email, password, isAdmin})
        newUser.password = await newUser.encryptPassword(password)
        if(newUser.email == config.ADMIN_EMAIL) {
            newUser.isAdmin = true
        } else {
            newUser.isAdmin = false
        }
        await newUser.save()
        res.redirect('/account/login')
    }
}

// Login function
const logIn = async (req, res) => {
    passport.authenticate('local', {
        successRedirect: '/account',
        failureRedirect: '/account/login',
        failureFlash: true
    })
}

// Logout function
const logOut = (req, res) => {
    req.logout();
    res.redirect("/users/login");
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
    logOut,
    createUser,
    updateUserById,
    deleteUserById
}