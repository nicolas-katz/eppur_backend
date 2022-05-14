const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const morgan = require('morgan')
const multer = require('multer')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
require('./passport/passport')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const compression = require('compression')
const mongoStore = require('connect-mongo')
const { engine } = require('express-handlebars')
const productsRouter = require('./routes/products.router') 
const authRouter = require('./routes/auth.router') 
const cartRouter = require('./routes/cart.router') 
const indexRouter = require('./routes/index.router') 
const orderRouter = require('./routes/order.router') 
const config = require('./config/config')

const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true}
const corsOptions = {
    origin: `http://localhost:${config.PORT}`,
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 200
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(session({
    store: mongoStore.create({
        mongoUrl: config.MONGODB_URI,
        mongoOptions,
    }),
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: Number(config.SESSION_EXPIRATION),
        httpOnly: false,
        secure: false
    }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(cors(corsOptions))
app.use(cookieParser(config.TOKEN_SECRET))
app.use(compression())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.user = req.user || null
    next()
})

app.use('/coleccion-eppur', productsRouter)
app.use('/mi-cuenta', authRouter)
app.use(indexRouter)
app.use('/carrito', cartRouter)
app.use('/checkout', orderRouter)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('.hbs', engine({
    extname: '.hbs',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
}));

app.use((req, res) => {
    res.status(404).render("404", {
        message: "La página",
        path: "/",
        button_text: "Inicio",
        user: req.session.user
    });
})

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("Lo sentimos. Hubo un error de nuestro servidor. Vuelve a intentarlo más tarde.");
});

module.exports = app