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
router.get('/collections', (req, res) => {
    res.render('collections/collections', {
        banner: true
    })
})
router.get('/all-products', (req, res) => {
    res.render('collections/all-products', {
        banner: true
    })
})
router.get('/products', (req, res) => {
    res.render('collections/products', {
        banner: true
    })
})
router.get('/outfits', (req, res) => {
    res.render('collections/outfits', {
        banner: true
    })
})
router.get('/details', (req, res) => {
    res.render('collections/details', {
        banner: false
    })
})

// Exports
module.exports = router