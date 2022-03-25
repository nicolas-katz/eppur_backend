// Imports
const express = require('express')
const { Router } = express
const router = Router()

// GET routes
router.get('/faqs', (req, res) => {
    res.render('information/faqs', {
        banner: false
    })
})
router.get('/contact', (req, res) => {
    res.render('information/contact', {
        banner: false
    })
})
router.get('/returns', (req, res) => {
    res.render('information/returns', {
        banner: false
    })
})
router.get('/about', (req, res) => {
    res.render('information/about', {
        banner: false
    })
})

// Exports
module.exports = router