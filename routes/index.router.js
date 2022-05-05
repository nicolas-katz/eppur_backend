const express = require('express')
const { Router } = express
const router = Router()
const { showProducts_withLimit } = require('../controllers/products.controllers')
const { showAllPhotos } = require('../controllers/gallery.controllers')
const sendEmail = require('../email/nodemailer')
const config = require('../config/config')
const getSystemInformation = require('../controllers/system.controllers')
const { isAdmin, isAuthenticated, isUser } = require('../middlewares/middlewares')

router
.get('/', showProducts_withLimit)
.get('/nosotros', (req, res) => { res.render('about', { user: req.session.user }) })
.get('/galeria', showAllPhotos)
.get('/preguntas-frecuentes', (req, res) => { res.render('faqs', { user: req.session.user }) })
.get('/contacto', (req, res) => {
    res.render('contact', { 
        user: req.session.user 
    }) 
})
.post('/contacto', (req, res) => {
    try {
        sendEmail(req.body.email, "nicokatz12@gmail.com", 'Eppur, tengo una consulta', req.body.message) 
        req.flash("success_msg", "Se ha enviado correctamente tu email. En breve te daremos una respuesta.")
    } catch(e) {
        req.flash("error_msg", "Lo sentimos. Hubo un error al enviar el mensaje.")
    } finally {
        res.redirect("/contacto")
    }
})
.get('/guia-de-talles', (req, res) => { res.render('sizes', { user: req.session.user }) })
.get('/outfits-for-you', (req, res) => { res.render('collections/outfits', { user: req.session.user }) })
.get('/devoluciones', (req, res) => { res.render('returns', { user: req.session.user }) })
.get('/como-comprar', (req, res) => { res.render('how-to-buy', { user: req.session.user }) })
.get('/terminos-y-condiciones', (req, res) => { res.render('terms', { user: req.session.user }) })
.get('/sistema', [ isAuthenticated, isAdmin ], getSystemInformation)
module.exports = router