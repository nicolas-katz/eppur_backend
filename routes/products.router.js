const express = require('express')
const { addProductToCart } = require('../controllers/cart.controllers')
const { Router } = express
const router = Router()
const { getProducts, getProductsById, getProductsByCategory, getProductsByColor, getProductsBySize } = require('../controllers/products.controllers')
const { isAuthenticated, isUser } = require('../middlewares/middlewares')

router
.get('/', getProducts)
.get('/categorias/:category', getProductsByCategory)
.get('/colores/:color', getProductsByColor)
.get('/talles/:size', getProductsBySize)
.get('/:category/:id', getProductsById)
.post('/agregar-producto', [ isAuthenticated, isUser ], addProductToCart)

module.exports = router