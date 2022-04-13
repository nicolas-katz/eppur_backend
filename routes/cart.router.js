// Imports
const express = require('express')
const { getUserCart, addProductToCart, removeProductOfCart, addOneProduct, removeOneProduct } = require('../controllers/cart.controllers')
const { isAuthenticated, verifyCart } = require('../middlewares/middlewares')
const { Router } = express
const router = Router()

// GET routes
router
.get('/checkout', [ isAuthenticated, verifyCart ], (req, res) => { res.render('cart/checkout', { user: req.session.user }) })
.get('/', [ isAuthenticated ], getUserCart)
.get('/remove-product/:id', removeProductOfCart)
.get('/addone-product/:id', addOneProduct)
.get('/removeone-product/:id', removeOneProduct)
.post('/add-product', addProductToCart)

// Exports
module.exports = router