const express = require('express')
const { Router } = express
const router = Router()
const { checkout, createNewOrder } = require('../controllers/order.controllers')
const { isAuthenticated, verifyCart, isUser } = require('../middlewares/middlewares')

router
.get('/cliente/:id', [ isAuthenticated, verifyCart, isUser ], checkout)
.post('/nueva-orden', [ isAuthenticated, verifyCart, isUser ], createNewOrder)

module.exports = router