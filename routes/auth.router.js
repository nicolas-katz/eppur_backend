// Imports
const express = require('express')
const { Router } = express
const router = Router()
const { 
    signUp, logIn, logOut
} = require('../controllers/auth.controllers')
const { isAuthenticated, isUnauthenticated, isAdmin, isSuperAdmin } = require('../middlewares/middlewares')

// GET routes
router.get('/login', isUnauthenticated, (req, res) => {
    res.render('account/login', {
        user: req.session.user
    })
})
router.get('/signup', isUnauthenticated, (req, res) => {
    res.render('account/signup', {
        user: req.session.user
    })
})
router.get("/logout", logOut)
router.get('/', isAuthenticated, (req, res) => {
    res.render('account/account', {
        user: req.session.user,
        username: req.session.username
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