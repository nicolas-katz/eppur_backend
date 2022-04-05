const Auth = require("../models/Auth");
const jwt = require('jsonwebtoken')
const config = require('../config');
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

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token')
  if(token) {
    try {
      const verified = jwt.verify(token, config.TOKEN_SECRET)
      req.user = verified
      return next()
    } catch (e) {
      res.status(400).json({error: 'Invalid Token'})
    }
  } else {
    res.status(401).json({error: 'Invalid Access'})
  }
}

const verifyCart = async (req, res, next) => {
  const userCart = Cart.findOne({_id: req.user._id})
  if(userCart) {
    return next()
  } else {
    res.redirect('/')
  }
}

module.exports = {
    isAdmin,
    isAuthenticated,
    fadeLogs,
    verifyToken,
    verifyCart
}