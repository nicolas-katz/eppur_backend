const passport = require('passport')
const localStrategy = require('passport-local')
const Auth = require('../models/Auth')

passport.use(
  new localStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await Auth.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Not User found." });
      } else {
        const match = await user.comparePassword(password);
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
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});