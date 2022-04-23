const express = require('express')
const { Router } = express
const router = Router()
const { signUp, logIn, logOut, getAllUsers, createUser, updateUserById, deleteUserById } = require('../controllers/auth.controllers')
const { getAllPhotos, createPhoto, deletePhotoById, updatePhotoById } = require('../controllers/gallery.controllers')
const { getAllProducts, createProduct, updateProductById, deleteProductById } = require('../controllers/products.controllers')
const { isAuthenticated, fadeLogs, isAdmin } = require('../middlewares/middlewares')
const Auth = require('../models/Auth')

router
.get('/login', fadeLogs, (req, res) => { res.render('account/login', { user: req.session.user }) })
.get('/signup', fadeLogs, (req, res) => { res.render('account/signup', { user: req.session.user }) })
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
.get('/administrator/usuarios/delete/:id', isAdmin, deleteUserById)
.post('/administrator/usuarios', isAdmin, createUser)
.post('/administrator/usuarios/edit/:id', isAdmin, updateUserById)
.get('/administrator/productos', isAdmin, getAllProducts)
.get('/administrator/productos/delete/:id', isAdmin, deleteProductById)
.post('/administrator/productos', isAdmin, createProduct)
.post('/administrator/productos/edit/:id', isAdmin, updateProductById)
.get('/administrator/galeria', isAdmin, getAllPhotos)
.get('/administrator/galeria/delete/:id', isAdmin, deletePhotoById)
.post('/administrator/galeria', isAdmin, createPhoto)
.post('/administrator/galeria/edit/:id', isAdmin, updatePhotoById)
.post('/signup', signUp)
.post('/login', logIn)

module.exports = router