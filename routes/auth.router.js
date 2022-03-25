// Imports
const express = require('express')
const { Router } = express
const router = Router()
const { 
    signUp, logIn
} = require('../controllers/auth.controllers')

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
router.get('/', (req, res) => {
    res.render('account/account', {
        banner: false
    })
})
router.get('/admin', (req, res) => {
    res.render('account/admin', {
        banner: false,
        query: req.query.show
    })
})

// POST routes
router.post('/signup', signUp)
router.post('/login', logIn)

// Exports
module.exports = router