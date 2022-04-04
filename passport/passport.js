const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const Auth = require('../models/Auth')

passport.use('login',
  new LocalStrategy(
    { 
      usernameField: "email", 
      passwordField: "password",
      passReqToCallback: true
    },
    async (email, password, done) => {
      const user = await Auth.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Not User found." });
      } else {
        const match = await user.comparePassword(password, user.password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password." });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})