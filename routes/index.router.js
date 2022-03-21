// Imports
const express = require('express')
const { Router } = express
const router = Router()

// GET routes
router.get('/', (req, res) => {
    res.render('index', {
        banner: true
    })
})

// Exports
module.exports = router