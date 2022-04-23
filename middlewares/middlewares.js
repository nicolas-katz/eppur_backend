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
        res.redirect("/");
      } 
    } else {
      res.redirect("/account/login");
    }
};

const isUser = async (req, res, next) => {
  if(req.session.user) {
    const currentUser = await Auth.findOne({email: req.session.user})
    if (currentUser.role == "user") {
        return next();
      } else {
        res.redirect("/");
      } 
    } else {
      res.redirect("/account/login");
    }
};

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      return next();
    } else {
      res.redirect("/account/login");
    }
};

const fadeLogs = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/account");
  } else {
    return next()
  }
};

const verifyCart = async (req, res, next) => {
  const cart = await Cart.findOne({userEmail: req.session.user})
  if(cart.products.length >= 1) {
    return next()
  } else {
    res.redirect('/cart')
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