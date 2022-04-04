// Imports
const Auth = require('../models/Auth')
const passport = require('passport')
const config = require('../config')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')

const registerSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
})

// Signup function
const signUp = async (req, res) => {
    const { firstname, lastname, phone, email, password, confirmpassword, role } = req.body
    registerSchema.validate(firstname, lastname, phone, email, password)
    const errors = []
    if(password != confirmpassword) {
        errors.push({message: "Password do not match. Try again."})
    }
    if(errors.length > 0) {
        res.render('account/signup', {errors, firstname, lastname, phone, email, password, confirmpassword})
    } else {
        const emailUser = await Auth.findOne({email: email})
        if(emailUser) {
            errors.push({message: "Email is already in use. Try again."})
            res.render('account/signup', {errors, firstname, lastname, phone, email, password, confirmpassword})
        }
        const newUser = await new Auth({firstname, lastname, phone, email, password, role})
        newUser.password = await newUser.encryptPassword(password)
        if(newUser.email == config.FIRST_ADMIN_EMAIL) {
            newUser.role = "admin"
        }
        if(newUser.email == config.SECOND_ADMIN_EMAIL) {
            newUser.role = "admin"
        }
        await newUser.save()
        req.flash("success_msg", "You are registered.");
        res.redirect('/account/login')
    }
}

const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
})

// Login function
const logIn = async (req, res) => {
    const { email, password } = req.body
    loginSchema.validate(email, password)
    // passport.authenticate('login', {
    //     successRedirect: '/account',
    //     failureRedirect: '/account/login',
    //     failureFlash: true
    // })
    const user = await Auth.findOne({email: email})
    if(!user) {
        req.flash("error_msg", "This email does not exist.");
        res.render("account/login")
    } else {
        const match = await user.comparePassword(password, user.password);
        if(!match) {
            req.flash("error_msg", "The password is wrong. Try again.");
            res.render("account/login")
        } else {
            req.session.user = email
            req.session.username = user.firstname;
            
            const token = jwt.sign({
                name: user.name,
                id: user._id
            }, config.TOKEN_SECRET)

            res.header('auth-token', token)
            res.redirect("/account")
        }
    }
}

// Logout function
const logOut = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (!err) {
            req.user = null
            res.redirect("/");
        } else {
            res.redirect("/account")
        }
    })
}     

// Get all users function
const getAllUsers = async (req, res) => {
    try {
        const users = await Auth.find({}).lean()
        res.render('account/admin/users', {
            users: users,
            user: req.session.user
        })
    } catch (e) {
        res.json(e)
    }
}

// Create user function
const createUser = async (req, res) => {
    const { firstname, lastname, phone, email, password, confirmpassword, isAdmin } = req.body
    const errors = []
    if(password != confirmpassword) {
        errors.push({message: "Password do not match. Try again."})
    }
    if(errors.length > 0) {
        res.render('account/administrator/ususarios', {errors, firstname, lastname, phone, email, password, confirmpassword})
    } else {
        const emailUser = await Auth.findOne({email: email})
        if(emailUser) {
            errors.push({message: "Email is already in use. Try again."})
            res.render('account/administrator/ususarios', {errors, firstname, lastname, phone, email, password, confirmpassword})
        }
        const newUser = await new Auth({firstname, lastname, phone, email, password, isAdmin})
        newUser.password = await newUser.encryptPassword(password)
        if(newUser.email == config.FIRST_ADMIN_EMAIL) {
            newUser.role = "admin"
        }
        if(newUser.email == config.SECOND_ADMIN_EMAIL) {
            newUser.role = "admin"
        }
        await newUser.save()
        res.redirect('/account/administrator/usuarios')
    }
}

// Update user function
const updateUserById = async (req, res) => {
  try {
      await Auth.findByIdAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true
      })
  } catch (e) {
    res.json(e)
  }
}

// Delete user function
const deleteUserById = async (req, res) => {
    try {
        await Auth.findByIdAndDelete({_id: req.params.id})
    } catch (e) {
      res.json(e)
    }
}

// Exports
module.exports = {
    signUp,
    logIn,
    logOut,
    getAllUsers,
    createUser,
    updateUserById,
    deleteUserById
}