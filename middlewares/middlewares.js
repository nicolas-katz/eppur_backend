const Auth = require("../models/Auth");

const isAdmin = (req, res, next) => {
    const currentUserEmail = req.session.user
    const currentUser = Auth.find({email: currentUserEmail})
    if (currentUser.isAdmin == true) {
      return next();
    }
    res.redirect("/");
};

const isSuperAdmin = (req, res, next) => {
    const currentUserEmail = req.session.user
    const currentUser = Auth.find({email: currentUserEmail})
    if (currentUser.isSuperAdmin == true) {
      return next();
    }
    res.redirect("/");
};

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/account/login");
};

const isUnauthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/account");
  }
  return next();
};

// const areProductsInCart = (req, res, next) => {
//   if () {
//     res.redirect("/cart");
//   }
//   return next();
// };

module.exports = {
    isAdmin,
    isSuperAdmin,
    isAuthenticated,
    isUnauthenticated
}