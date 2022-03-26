// Imports
const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
require('./config/passport')
const flash = require('connect-flash')
const { engine } = require('express-handlebars')
const productsRouter = require('./routes/products.router') 
const authRouter = require('./routes/auth.router') 
const infoRouter = require('./routes/info.router') 
const cartRouter = require('./routes/cart.router') 
const createAdminUser = require('./libs/createAdminUser') 
const config = require('./config')

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))
app.use(morgan('dev'))
app.use(cors()) 
app.use(methodOverride('_method'))
app.use(session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

// Global functions
createAdminUser()

// Routes
app.use('/collections', productsRouter)
app.use('/account', authRouter)
app.use('/information', infoRouter)
app.use('/cart', cartRouter)

// Index route
app.get('/', (req, res) => {
    res.render('index', {
        banner: true
    })
})

// Error 404 route
app.use((req, res) => {
    res.render("404");
});
  
// Express handlebars engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('.hbs', engine({
    extname: '.hbs',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
}));

// Exports
module.exports = app