const express = require('express')
const { Router } = express
const router = Router()
const { showProducts_withLimit } = require('../controllers/products.controllers')
const { showAllPhotos } = require('../controllers/gallery.controllers')
const sendEmail = require('../email/nodemailer')
const config = require('../config/config')

router
.get('/', showProducts_withLimit)
.get('/about', (req, res) => { res.render('about', { user: req.session.user }) })
.get('/gallery', showAllPhotos)
.get('/faqs', (req, res) => { res.render('faqs', { user: req.session.user }) })
.get('/contact', (req, res) => {
    res.render('contact', { 
        user: req.session.user 
    }) 
})
.post('/contact', (req, res) => {
    sendEmail(req.body.email, config.SUPER_ADMIN_EMAIL, 'Eppur, tengo una consulta', req.body.message) 
    req.flash("success_msg", "Se ha enviado correctamente tu email. Gracias por comunicarte con Eppur!")
    res.redirect("/contact")
})
.get('/sizes', (req, res) => { res.render('sizes', { user: req.session.user }) })

module.exports = router