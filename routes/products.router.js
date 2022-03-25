// Imports
const express = require('express')
const { Router } = express
const router = Router()
const { 
    getProducts, 
    getProductsById, 
    getProductsByCategory
} = require('../controllers/products.controllers')

// GET routes
router.get('/', (req, res) => {
    res.render('collections/collections', {
        banner: true
    })
})
router.get('/products', getProducts)
router.get('/products/categories', getProductsByCategory)
router.get('/products/product/details', (req, res) => {
    res.render("collections/details", {
        banner: false
    })
})

// Exports
module.exports = router