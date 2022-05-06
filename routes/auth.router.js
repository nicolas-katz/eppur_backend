const express = require('express')
const { Router } = express
const router = Router()
const { signUp, logIn, logOut, getAllUsers, createUser, updateUserById, deleteUserById } = require('../controllers/auth.controllers')
const { getAllPhotos, createPhoto, deletePhotoById, updatePhotoById } = require('../controllers/gallery.controllers')
const { getClientOrders, getAllOrders, deleteOrderById, createNewOrder, updateOrderById } = require('../controllers/order.controllers')
const { getAllProducts, createProduct, updateProductById, deleteProductById } = require('../controllers/products.controllers')
const { isAuthenticated, fadeLogs, isAdmin } = require('../middlewares/middlewares')
const Auth = require('../models/Auth')

router
.get('/login', fadeLogs, (req, res) => { res.render('account/login', { user: req.session.user }) })
.get('/signup', fadeLogs, (req, res) => { res.render('account/signup', { user: req.session.user }) })
.get("/logout", logOut)
.get('/', isAuthenticated, getClientOrders)
.get('/administrador/ordenes', [ isAdmin, isAuthenticated ], getAllOrders)
.get('/administrador/ordenes/remover/:id', [ isAdmin, isAuthenticated ], deleteOrderById)
.post('/administrador/ordenes', [ isAdmin, isAuthenticated ], createNewOrder)
.post('/administrador/ordenes/editar/:id', [ isAdmin, isAuthenticated ], updateOrderById)
.get('/administrador/usuarios', [ isAdmin, isAuthenticated ], getAllUsers)
.get('/administrador/usuarios/remover/:id', [ isAdmin, isAuthenticated ], deleteUserById)
.post('/administrador/usuarios', [ isAdmin, isAuthenticated ], createUser)
.post('/administrador/usuarios/editar/:id', [ isAdmin, isAuthenticated ], updateUserById)
.get('/administrador/productos', [ isAdmin, isAuthenticated ], getAllProducts)
.get('/administrador/productos/remover/:id', [ isAdmin, isAuthenticated ], deleteProductById)
.post('/administrador/productos', [ isAdmin, isAuthenticated ], createProduct)
.post('/administrador/productos/editar/:id', [ isAdmin, isAuthenticated ], updateProductById)
.get('/administrador/galeria', [ isAdmin, isAuthenticated ], getAllPhotos)
.get('/administrador/galeria/remover/:id', [ isAdmin, isAuthenticated ], deletePhotoById)
.post('/administrador/galeria', [ isAdmin, isAuthenticated ], createPhoto)
.post('/administrador/galeria/editar/:id', [ isAdmin, isAuthenticated ], updatePhotoById)
.post('/signup', signUp)
.post('/login', logIn)

module.exports = router