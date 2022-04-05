// Imports
const express = require('express')
const { getUserCart, addProductToCart, deleteAllProduct, deleteProductOfCart } = require('../controllers/cart.controllers')
const { isAuthenticated, verifyCart } = require('../middlewares/middlewares')
const { Router } = express
const router = Router()

// GET routes
router
.get('/checkout', [isAuthenticated, verifyCart ], (req, res) => {
    res.render('cart/checkout', {
        user: req.session.user
    })
})
.get('/', getUserCart)
.post('/:id', addProductToCart)
.delete('/:id', deleteProductOfCart)
.delete('/', deleteAllProduct)

// Exports
module.exports = router