const passport = require('passport')
const Auth = require('../models/Auth')
const localStrategy = require('passport-local').Strategy

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await Auth.findOne({email: email})
    if(!user) {
        return done(null, false, {message: 'Not user found'})
    } else {
        const matchPassword = await Auth.comparePassword(password)
        if(matchPassword) {
            return done(null, user)
        } else {
            return done(null, false, {message: 'Incorrect password'})
        }
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    Auth.findById(id, (err, user) => {
        done(err, user)
    })
})