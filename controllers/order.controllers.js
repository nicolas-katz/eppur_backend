const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Auth = require('../models/Auth')
const config = require('../config/config')
const sendEmail = require('../email/nodemailer')
const { renderNewOrder, renderClientOrder } = require('../libs/renderEmailTables')

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).lean()
        res.render('account/admin/orders', {
            user: req.session.user,
            orders: orders
        })
    } catch (e) {
        res.redirect("/")
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
        req.flash("success_msg", "Tu pedido se ha completado con exito. Revisa tu casilla para terminar la compra.")
        sendEmail('nicokatz12@gmail.com', 'nicokatz12@gmail.com', 'Se ha registrado una nueva orden', renderNewOrder(newOrder))
        sendEmail('nicokatz12@gmail.com', 'nicokatz12@gmail.com', 'Tu pedido ha sido un exito', renderClientOrder(newOrder))
        res.redirect("/mi-cuenta")
    } catch (e) {
        res.redirect("/")
    }
}

const updateOrderById = async (req, res) => {
    try {
        await Order.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        })
        res.redirect("/mi-cuenta/administrador/ordenes")
    } catch (e) {
        res.redirect("/")
    }
}

const deleteOrderById = async (req, res) => {
    try {
        await Order.findByIdAndDelete({_id: req.params.id})
        res.redirect("/mi-cuenta/administrador/ordenes")
    } catch (e) {
        res.redirect("/")
    }
}

const getClientOrders = async (req, res) => {
    try {
        const orders = await Order.find({userID: req.session._id}).lean()
        const isAdmin = await Auth.findOne({email: req.session.user, role: "admin"})

        res.render('account/account', {
            user: req.session.user,
            username: req.session.username,
            isAdmin: isAdmin,
            orders: orders
        })
    } catch (e) {
        res.redirect("/")
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
        res.redirect("/")
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
