const express = require('express')
const getSystemInformation = require('../controllers/system.controllers')
const { isAdmin } = require('../middlewares/middlewares')
const { Router } = express
const router = Router()

router
.get('/returns', (req, res) => { res.render('information/returns', { user: req.session.user }) })
.get('/terms', (req, res) => { res.render('information/terms', { user: req.session.user }) })
.get('/system', isAdmin, getSystemInformation)

module.exports = router