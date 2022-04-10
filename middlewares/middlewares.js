const Auth = require("../models/Auth");
const jwt = require('jsonwebtoken')
const config = require('../config/config');
const Cart = require("../models/Cart");

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
  const userCart = Cart.findOne({userEmail: req.session.user})
  if(userCart) {
    return next()
  } else {
    res.redirect('/')
  }
}

module.exports = {
    isAdmin,
    isUser,
    isAuthenticated,
    fadeLogs,
    verifyCart
}