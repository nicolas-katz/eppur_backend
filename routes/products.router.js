const express = require('express')
const { addProductToCart } = require('../controllers/cart.controllers')
const { Router } = express
const router = Router()
const { getProducts, getProductsById, getProductsByCategory, getProductsByColor, getProductsBySize } = require('../controllers/products.controllers')

router
.get('/outfits-for-you', (req, res) => {
    res.render('collections/outfits', {
        user: req.session.user
    })
})
.get('/coleccion-eppur', getProducts)
.get('/coleccion-eppur/:category', getProductsByCategory)
.get('/coleccion-eppur/colores/:color', getProductsByColor)
.get('/coleccion-eppur/talles/:size', getProductsBySize)
.get('/coleccion-eppur/:category/:id', getProductsById)
.post('/coleccion-eppur/:category/:id', addProductToCart)

module.exports = router