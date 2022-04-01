// Imports
const express = require('express')
const { Router } = express
const router = Router()
const { 
    getProducts, 
    getOutfits,
    getProductsById, 
    getProductsByCategory,
    createProduct
} = require('../controllers/products.controllers')

// GET routes
router.get('/', (req, res) => {
    res.render('collections/collections', {
        user: req.session.user
    })
})
router.get('/outfits', getOutfits)
router.get('/products/all-products', getProducts)
router.get('/products/:category', getProductsByCategory)
router.get('/products/details/:id', getProductsById)
router.post('/create', createProduct)

// Exports
module.exports = router