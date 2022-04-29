const express = require('express')
const { getUserCart, addProductToCart, removeProductOfCart, addOneProduct, removeOneProduct } = require('../controllers/cart.controllers')
const { isAuthenticated, isUser } = require('../middlewares/middlewares')
const { Router } = express
const router = Router()

router
.get('/', [ isAuthenticated, isUser ], getUserCart)
.get('/remover-producto/:id', [ isAuthenticated, isUser ], removeProductOfCart)
.get('/agregar-un-producto/:id', [ isAuthenticated, isUser ], addOneProduct)
.get('/remover-un-producto/:id', [ isAuthenticated, isUser ], removeOneProduct)
.post('/agregar-producto', [ isAuthenticated, isUser ], addProductToCart)

module.exports = router