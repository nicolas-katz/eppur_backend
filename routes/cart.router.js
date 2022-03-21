// Imports
const express = require('express')
const { Router } = express
const router = Router()

// GET routes
router.get('/checkout', (req, res) => {
    res.render('cart/checkout', {
        banner: false
    })
})

// Exports
module.exports = router