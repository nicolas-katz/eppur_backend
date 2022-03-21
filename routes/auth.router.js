// Imports
const express = require('express')
const { Router } = express
const router = Router()
const {
    createProduct,
    updateProductById,
    deleteProductById
} = require('../controllers/products.controllers')
const {
    createUser,
    updateUserById,
    deleteUserById
} = require('../controllers/auth.controllers')
const Auth = require('../models/Auth')

// GET routes
router.get('/login', (req, res) => {
    res.render('account/login', {
        banner: false
    })
})
router.get('/signup', (req, res) => {
    res.render('account/signup', {
        banner: false
    })
})
router.get('/account', (req, res) => {
    res.render('account/account', {
        banner: false
    })
})

// POST routes
// PUT routes
// DELETE routes


// Exports
module.exports = router