const express = require('express')
const { getUserCart, addProductToCart, removeProductOfCart, addOneProduct, removeOneProduct } = require('../controllers/cart.controllers')
const { isAuthenticated } = require('../middlewares/middlewares')
const { Router } = express
const router = Router()

router
.get('/', isAuthenticated, getUserCart)
.get('/remove-product/:id', isAuthenticated, removeProductOfCart)
.get('/addone-product/:id', isAuthenticated, addOneProduct)
.get('/removeone-product/:id', isAuthenticated, removeOneProduct)
.post('/add-product', isAuthenticated, addProductToCart)

module.exports = router