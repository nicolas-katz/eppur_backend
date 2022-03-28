// Imports
const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
require('./config/passport')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const compression = require('compression')
const { engine } = require('express-handlebars')
const productsRouter = require('./routes/products.router') 
const authRouter = require('./routes/auth.router') 
const infoRouter = require('./routes/info.router') 
const cartRouter = require('./routes/cart.router') 
const createAdminUser = require('./libs/createAdminUser') 
const config = require('./config')

// CORS Configuration
const corsOptions = {
    origin: `http://localhost:${config.PORT}`,
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 200
}

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: config.SESSION_EXPIRATION * 1000,
        httpOnly: false,
        secure: false
    }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(compression())

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

// Index routes
app.get('/', (req, res) => {
    res.render('index', {
        banner: true,
        user: req.session.user
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        user: req.session.user
    })
})

// Express handlebars engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('.hbs', engine({
    extname: '.hbs',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
}));

// 404 Error
app.use((req, res) => {
    res.status(404).render("404", {
        message: "La página",
        path: "/",
        button_text: "INICIO"
    });
})

// 500 Error
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("We found an error 500: " + err);
});

// Exports
module.exports = app