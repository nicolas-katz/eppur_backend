const Auth = require("../models/Auth");
const jwt = require('jsonwebtoken')
const config = require('../config/config');
const Cart = require("../models/Cart");

const verifyLoginToken = async (req, res, next) => {
  const token = req.signedCookies.token
  if (!token) req.flash('error_msg', 'Invalid Token')
  try {
      const user = jwt.verify(token, config.TOKEN_SECRET)
      req.user = user
      return next()
  } catch (e) {
      req.flash('error_msg', 'Invalid Token')
      res.redirect("/")
  }
}

const isAdmin = async (req, res, next) => {
  if(req.session.user) {
    const currentUser = await Auth.findOne({email: req.session.user})
    if (currentUser.role == "admin") {
        return next();
      } else {
        req.flash("error_msg", "Lo sentimos. Solo administradores del sitio.")
        res.redirect("/mi-cuenta");
      } 
    } else {
      req.flash("error_msg", "Lo sentimos. Solo administradores del sitio.")
      res.redirect("/mi-cuenta/login");
    }
};

const isUser = async (req, res, next) => {
  if(req.session.user) {
    const currentUser = await Auth.findOne({email: req.session.user})
    if (currentUser.role == "user") {
        return next();
      } else {
        req.flash("error_msg", "Lo sentimos. Solo usuarios.")
        res.redirect("/mi-cuenta");
      } 
    } else {
      res.redirect("/mi-cuenta/login");
    }
};

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      return next();
    } else {
      req.flash("error_msg", "Por favor, primero debes iniciar sesión.")
      res.redirect("/mi-cuenta/login");
    }
};

const fadeLogs = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/mi-cuenta");
  } else {
    return next()
  }
};

const verifyCart = async (req, res, next) => {
  const cart = await Cart.findOne({userEmail: req.session.user})
  if(cart.products.length >= 1) {
    return next()
  } else {
    req.flash("error_msg", "Aún no tenes productos en tu carrito.")
    res.redirect('/carrito')
  }
}

module.exports = {
    verifyLoginToken,
    isAdmin,
    isUser,
    isAuthenticated,
    fadeLogs,
    verifyCart
}