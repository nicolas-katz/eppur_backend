// Imports
const express = require('express')
const { Router } = express
const router = Router()
const { signUp, logIn, logOut, getAllUsers, createUser } = require('../controllers/auth.controllers')
const { getAllPhotos, createPhoto } = require('../controllers/gallery.controllers')
const { getAllProducts, createProduct } = require('../controllers/products.controllers')
const { isAuthenticated, fadeLogs, isAdmin } = require('../middlewares/middlewares')
const Auth = require('../models/Auth')

router
.get('/login', fadeLogs, (req, res) => {
    res.render('account/login', {
        user: req.session.user
    })
})
.get('/signup', fadeLogs, (req, res) => {
    res.render('account/signup', {
        user: req.session.user
    })
})
.get("/logout", logOut)
.get('/', isAuthenticated, async (req, res) => {
    const isAdmin = await Auth.findOne({email: req.session.user, role: "admin"})
    res.render('account/account', {
        user: req.session.user,
        username: req.session.username,
        isAdmin: isAdmin
    })
})
.get('/administrator/usuarios', isAdmin, getAllUsers)
.get('/administrator/productos', isAdmin, getAllProducts)
.get('/administrator/galeria', isAdmin, getAllPhotos)

.post('/administrator/usuarios', createUser)
.post('/administrator/galeria', createPhoto)
.post('/administrator/productos', createProduct)
.post('/signup', signUp)
.post('/login', logIn)

module.exports = router