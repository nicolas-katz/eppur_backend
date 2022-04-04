// Imports
const express = require('express')
const { Router } = express
const router = Router()
const { signUp, logIn, logOut, getAllUsers, createUser } = require('../controllers/auth.controllers')
const { getAllPhotos, createPhoto } = require('../controllers/gallery.controllers')
const { getAllProducts, createProduct } = require('../controllers/products.controllers')
const { isAuthenticated, fadeLogs, isAdmin } = require('../middlewares/middlewares')
const Auth = require('../models/Auth')

// GET routes
router.get('/login', fadeLogs, (req, res) => {
    res.render('account/login', {
        user: req.session.user
    })
})
router.get('/signup', fadeLogs, (req, res) => {
    res.render('account/signup', {
        user: req.session.user
    })
})
router.get("/logout", logOut)
router.get('/', isAuthenticated, async (req, res) => {
    const isAdmin = await Auth.findOne({email: req.session.user, role: "admin"})
    res.render('account/account', {
        user: req.session.user,
        username: req.session.username,
        isAdmin: isAdmin
    })
})
router.get('/administrator/usuarios', [isAuthenticated, isAdmin], getAllUsers)
router.get('/administrator/productos', [isAuthenticated, isAdmin], getAllProducts)
router.get('/administrator/galeria', [isAuthenticated, isAdmin], getAllPhotos)

// POST routes
router.post('/administrator/usuarios', createUser)
router.post('/administrator/galeria', createPhoto)
router.post('/administrator/productos', createProduct)
router.post('/signup', signUp)
router.post('/login', logIn)

// Exports
module.exports = router