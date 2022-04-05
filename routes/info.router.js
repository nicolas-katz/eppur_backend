// Imports
const express = require('express')
const getSystemInformation = require('../controllers/system.controllers')
const { isAdmin } = require('../middlewares/middlewares')
const { Router } = express
const router = Router()

// GET routes
router
.get('/faqs', (req, res) => {
    res.render('information/faqs', {
        user: req.session.user
    })
})
.get('/contact', (req, res) => {
    res.render('information/contact', {
        user: req.session.user
    })
})
.get('/returns', (req, res) => {
    res.render('information/returns', {
        user: req.session.user
    })
})
.get('/private', (req, res) => {
    res.render('information/private', {
        user: req.session.user
    })
})
.get('/terms', (req, res) => {
    res.render('information/terms', {
        user: req.session.user
    })
})
.get('/system', isAdmin, getSystemInformation)

// Exports
module.exports = router