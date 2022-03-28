const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const Auth = require('../models/Auth')

function getByUsername(username) {
  try {
    const users = users_contenedor.getAll();
    const match = users.find((user) => user.username === username);
    return match ? match : null;
  } catch (error) {
    throw new Error(
      `Error al obtener el usuario con username:'${username}': ${error}`
    );
  }
}

passport.use('login',
  new LocalStrategy(
    { 
      emailField: "email", 
      passwordField: "password",
      passReqToCallback: true
    },
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
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})