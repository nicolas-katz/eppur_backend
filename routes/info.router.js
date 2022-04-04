// Imports
const express = require('express')
const sendEmailContact = require('../email/nodemailer')
const { Router } = express
const router = Router()

// GET routes
router.get('/faqs', (req, res) => {
    res.render('information/faqs', {
        user: req.session.user
    })
})
router.get('/contact', (req, res) => {
    res.render('information/contact', {
        user: req.session.user
    })
})
router.get('/returns', (req, res) => {
    res.render('information/returns', {
        user: req.session.user
    })
})
router.get('/private', (req, res) => {
    res.render('information/private', {
        user: req.session.user
    })
})
router.get('/terms', (req, res) => {
    res.render('information/terms', {
        user: req.session.user
    })
})

// Exports
module.exports = router