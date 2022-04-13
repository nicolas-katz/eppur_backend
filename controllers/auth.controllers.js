// Imports
const Auth = require('../models/Auth')
const config = require('../config/config')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')
const sendEmail = require('../email/nodemailer')
const { renderNewUser } = require('../libs/renderEmailTables')

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
        sendEmail('nicokatz12@gmail.com', 'nicokatz12@gmail.com', 'Se ha registrado un nuevo usuario', renderNewUser(newUser))
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
            req.session.username = user.firstname
            req.session.role = user.role
            req.session._id = user._id
            req.user = {
                firstname: user.firstname,
                email: email,
                role: user.role,
                _id: user._id
            }
            req.session.isAuthenticated = true
                        
            const token = jwt.sign({
                name: user.firstname, 
                userID: user._id, 
                role: user.role
            }, config.TOKEN_SECRET, {
                expiresIn: '1d'
            })

            res.cookie('token', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 1000*60*60*24),
                secure: config.NODE_ENV === 'production',
                signed: true
            })
            res.redirect("/collections/coleccion-eppur")
        }
    }
}

// Logout function
const logOut = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (!err) {
            req.user = null
            const token = req.signedCookies.token
            res.cookie('token', token, {
                httpOnly: true,
                expires: new Date(Date.now())
            })
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
        const userID = await Auth.findOne({_id: req.params.id})
        const _usedID = userID.email == "eppur@gmail.com"
        if(_usedID) {
            req.flash("error_msg", "You can not edit a super admin. Try again.");
            res.redirect("/account")
        } else {
            await Auth.findByIdAndUpdate({_id: req.params.id}, req.body, {
                new: true,
                runValidators: true
            })
            res.redirect("/account/administrator/usuarios")
        }
    } catch (e) {
        res.json(e)
  }
}

// Delete user function
const deleteUserById = async (req, res) => {
    try {
        const userID = await Auth.findOne({_id: req.params.id})
        const _usedID = userID.email == "eppur@gmail.com"
        if(_usedID) {
            req.flash("error_msg", "You can not delete a super admin. Try again.");
            res.redirect("/account")
        } else {
            await Auth.findByIdAndDelete({_id: req.params.id})
            res.redirect("/account/administrator/usuarios")
        }
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