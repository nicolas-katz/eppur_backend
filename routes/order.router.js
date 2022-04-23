const express = require('express')
const { Router } = express
const router = Router()
const { checkout, createNewOrder } = require('../controllers/order.controllers')
const { isAuthenticated, verifyCart } = require('../middlewares/middlewares')

router
.get('/client/:id', [ isAuthenticated, verifyCart ], checkout)
.post('/newOrder', [ isAuthenticated, verifyCart ], createNewOrder)

module.exports = router