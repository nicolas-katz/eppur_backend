const express = require('express')
const { Router } = express
const router = Router()
const { showProducts_withLimit } = require('../controllers/products.controllers')
const { showAllPhotos } = require('../controllers/gallery.controllers')

router
.get('/', showProducts_withLimit)
.get('/about', (req, res) => { res.render('about', { user: req.session.user }) })
.get('/gallery', showAllPhotos)
.get('/faqs', (req, res) => { res.render('faqs', { user: req.session.user }) })
.get('/contact', (req, res) => { res.render('contact', { user: req.session.user }) })
.get('/sizes', (req, res) => { res.render('sizes', { user: req.session.user }) })

// Exports
module.exports = router