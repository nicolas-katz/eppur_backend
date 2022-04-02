// Imports
const express = require('express')
const { Router } = express
const router = Router()
const { 
    signUp, logIn, logOut, getAllUsers
} = require('../controllers/auth.controllers')
const { getAllPhotos } = require('../controllers/gallery.controllers')
const { getAllProducts } = require('../controllers/products.controllers')
const { isAuthenticated, isUnauthenticated, isAdmin, isSuperAdmin } = require('../middlewares/middlewares')

// GET routes
router.get('/login', isUnauthenticated, (req, res) => {
    res.render('account/login', {
        user: req.session.user
    })
})
router.get('/signup', isUnauthenticated, (req, res) => {
    res.render('account/signup', {
        user: req.session.user
    })
})
router.get("/logout", logOut)
router.get('/', (req, res) => {
    res.render('account/account', {
        user: req.session.user,
        username: req.session.username
    })
})
router.get('/administrator/usuarios', getAllUsers)
router.get('/administrator/productos', getAllProducts)
router.get('/administrator/galeria', getAllPhotos)

// POST routes
router.post('/signup', signUp)
router.post('/login', logIn)

// Exports
module.exports = router