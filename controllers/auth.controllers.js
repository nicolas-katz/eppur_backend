const Auth = require('../models/Auth')
const config = require('../config/config')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')
const sendEmail = require('../email/nodemailer')
const { renderNewUser, renderNewUserClient } = require('../libs/renderEmailTables')

const registerSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
})

const signUp = async (req, res) => {
    const { firstname, lastname, phone, email, password, confirmpassword, role } = req.body
    registerSchema.validate(firstname, lastname, phone, email, password)
    if(password != confirmpassword) {
        req.flash('error_msg', 'Las contraseñas no coinciden. Vuelve a intentarlo.')
        res.redirect("/mi-cuenta/signup")
    } else {
        const emailUser = await Auth.findOne({email: email})
        if(emailUser) {
            req.flash('error_msg', 'El correo ingresado ya existe. Intenta con otro correo.')
            res.redirect("/mi-cuenta/signup")
        }
        const newUser = await new Auth({firstname, lastname, phone, email, password, role})
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        sendEmail('nicokatz12@gmail.com', 'nicokatz12@gmail.com', 'Se ha registrado un nuevo usuario', renderNewUser(newUser))
        sendEmail('nicokatz12@gmail.com', 'nicokatz12@gmail.com', 'Felicidades! Ya eres un Eppurer!', renderNewUserClient(newUser))
        req.flash("success_msg", "Felicidades. Tu registro ha sido exitoso.");
        res.redirect('/mi-cuenta/login')
    }
}

const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
})

const logIn = async (req, res) => {
    const { email, password } = req.body
    loginSchema.validate(email, password)
    const user = await Auth.findOne({email: email})
    if(!user) {
        req.flash("error_msg", "Lo sentimos. El correo ingresado no esta registrado.");
        res.redirect("/mi-cuenta/login")
    } else {
        const match = await user.comparePassword(password, user.password);
        if(!match) {
            req.flash("error_msg", "La contraseña ingresada es incorrecta. Vuelve a intentarlo.");
            res.redirect("/mi-cuenta/login")
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

            req.flash("success_msg", `Bienvenido de nuevo, ${user.firstname}!`)
            res.redirect("/coleccion-eppur")
        }
    }
}

const logOut = (req, res) => {
    req.flash('success_msg', 'Te has deslogueado correctament. Hasta pronto.')
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
            res.redirect("/mi-cuenta")
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
        res.redirect("/")
    }
}

const updateUserById = async (req, res) => {
  try {
        const userID = await Auth.findOne({_id: req.params.id})
        const _usedID = userID.email == "eppur@gmail.com"
        if(_usedID) {
            req.flash("error_msg", "No se puede modificar información de un super admin. Intenta con otro usuario.");
            res.redirect("/mi-cuenta/administrador/usuarios")
        } else {
            await Auth.findByIdAndUpdate({_id: req.params.id}, req.body, {
                new: true,
                runValidators: true
            })
            req.flash("success_msg", "Se ha modificado correctamente.");
            res.redirect("/mi-cuenta/administrador/usuarios")
        }
    } catch (e) {
        res.redirect("/")
  }
}

const deleteUserById = async (req, res) => {
    try {
        const userID = await Auth.findOne({_id: req.params.id})
        const _usedID = userID.email == "eppur@gmail.com"
        if(_usedID) {
            req.flash("error_msg", "No se puede eliminar a un super admin. Intenta con otro usuario.");
            res.redirect("/mi-cuenta/administrador/usuarios")
        } else {
            await Auth.findByIdAndDelete({_id: req.params.id})
            req.flash("success_msg", "Se ha eliminado correctamente.");
            res.redirect("/mi-cuenta/administrador/usuarios")
        }
    } catch (e) {
      res.redirect("/")
    }
}

module.exports = {
    signUp,
    logIn,
    logOut,
    getAllUsers,
    updateUserById,
    deleteUserById
}