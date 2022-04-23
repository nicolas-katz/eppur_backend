const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Auth = require('../models/Auth')
const config = require('../config/config')
const sendEmail = require('../email/nodemailer')
const { renderNewOrder, renderClientOrder } = require('../libs/renderEmailTables')

const getAllOrders = async (req, res) => {
    try {
        
    } catch (e) {
        res.json(e)
    }
}

const createNewOrder = async (req, res) => {
    try {
        const { payment, shipment, firstname, lastname, phone, email } = req.body
        const cart = await Cart.findOne({userEmail: req.session.user})
        const user = await Auth.findOne({email: req.session.user})
        const _numOrder = await Order.countDocuments({}) + 1
        const newOrder = await new Order({
            userData: {
                email: email,
                firstname: firstname,
                lastname: lastname,
                phone: phone
            },
            userID: user._id,
            products: cart.products,
            state: 'Generado',
            payment: payment,
            shipment: shipment,
            numOrder: _numOrder,
            total: cart.total,            
        })
        cart.products = []
        cart.total = 0
        await cart.save()
        await newOrder.save()
        sendEmail('nicokatz12@gmail.com', 'nicokatz12@gmail.com', 'Se ha registrado una nueva orden', renderNewOrder(newOrder))
        sendEmail('nicokatz12@gmail.com', 'nicokatz12@gmail.com', 'Tu pedido ha sido un exito', renderClientOrder(newOrder))
        res.redirect("/account")
    } catch (e) {
        res.json(e)
    }
}

const updateOrderById = async (req, res) => {
    try {
        
    } catch (e) {
        res.json(e)
    }
}

const deleteOrderById = async (req, res) => {
    try {
        
    } catch (e) {
        res.json(e)
    }
}

const getClientOrders = async (req, res) => {
    try {
        
    } catch (e) {
        res.json(e)
    }
}

const checkout = async (req, res) => {
    try {
        const user = await Auth.findOne({_id: req.params.id})
        const cart = await Cart.findOne({userID: req.params.id}).lean()

        res.render('cart/checkout', {
            user: req.session.user,
            userID: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            products: cart.products,
            total: cart.total
        })
    } catch (e) {
        res.json(e)
    }
}

module.exports = {
    getAllOrders,
    updateOrderById,
    deleteOrderById,
    getClientOrders,
    createNewOrder,
    checkout
}
