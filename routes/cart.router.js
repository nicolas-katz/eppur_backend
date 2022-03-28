// Imports
const express = require('express')
const { 
    isAuthenticated
} = require('../middlewares/middlewares')
const { Router } = express
const router = Router()

// GET routes
router.get('/checkout', isAuthenticated, (req, res) => {
    res.render('cart/checkout', {
        user: req.session.user
    })
})

// Exports
module.exports = router