// Imports
const express = require('express')
const { Router } = express
const router = Router()
const { 
    signUp, logIn, logOut
} = require('../controllers/auth.controllers')
const { isAuthenticated, fadeLogs, isAdmin, isSuperAdmin } = require('../middlewares/middlewares')

// GET routes
router.get('/login', fadeLogs, (req, res) => {
    res.render('account/login', {
        user: req.session.user
    })
})
router.get('/signup', fadeLogs, (req, res) => {
    res.render('account/signup', {
        user: req.session.user
    })
})
router.get("/logout", logOut)
router.get('/', isAuthenticated, (req, res) => {
    res.render('account/account', {
        user: req.session.user
    })
})
router.get('/admin', isAuthenticated ,(req, res) => {
    res.render('account/admin', {
        query: req.query.show,
        user: req.session.user
    })
})

// POST routes
router.post('/signup', signUp)
router.post('/login', logIn)

// Exports
module.exports = router