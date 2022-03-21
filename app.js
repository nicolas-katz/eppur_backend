// Imports
const express = require('express')
const app = express()
require('dotenv')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const methodOverride = require('method-override')
const session = require('express-session')
const { engine } = require('express-handlebars')
const productsRouter = require('./routes/products.router') 
const authRouter = require('./routes/auth.router') 
const infoRouter = require('./routes/info.router') 
const cartRouter = require('./routes/cart.router') 
const indexRouter = require('./routes/index.router') 
const { 
    getProducts, 
    getProductsById, 
    getProductsByCategory,
    createProduct,
    updateProductById,
    deleteProductById,
    deleteProducts
} = require('./controllers/products.controllers')

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))
app.use(morgan('dev'))
app.use(cors()) 
app.use(methodOverride('_method'))
app.use(session({
    secret: 'eppurapp',
    resave: true,
    saveUninitialized: true
}))

// Routes
app.use('/', productsRouter)
app.use('/', authRouter)
app.use('/', infoRouter)
app.use('/', cartRouter)
app.use('/', indexRouter)
  
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