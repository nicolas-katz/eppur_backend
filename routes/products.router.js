// Imports
const express = require('express')
const { Router } = express
const router = Router()
const { 
    getProducts, 
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
router.get('/products', getProducts)
router.get('/products/categories/:category', getProductsByCategory)
router.get('/products/product/details/:id', getProductsById)
router.post('/create', createProduct)

// Exports
module.exports = router