const Auth = require('../models/Auth')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const formatterDolar = require('../libs/formatPrices')

const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({userEmail: req.session.user}).lean()
        if(cart) {
            const cartProducts = cart.products
            const cartTotal = formatterDolar.format(cart.total)
            res.render('cart/cart', {
                cartProducts: cartProducts,
                cartTotal: cartTotal,
                user: req.session.user
            })
        } else {
            res.render('cart/cart', {
                user: req.session.user
            })
        }
    } catch (e) {
        res.json(e)
    }
}

const addProductToCart = async (req, res) => {
    try {
        const { productID, quantity } = req.body
        const parsedQuantity = Number(quantity)
        const userEmail = req.session.user
        const cart = await Cart.findOne({email: userEmail}) || null
        const product = await Product.findOne({_id: productID})
        if(!product) {
            req.flash("error_msg", "The product does not exists. Try again.");
            res.redirect("collections/coleccion-eppur")
        }  
        let title = product.title
        let price = product.price
        let category = product.category
        let size = product.size
        let color = product.color
        let stock = product.stock
        let image = product.image
        let subtotal = product.price * parsedQuantity
        
        if(cart != null) {
            let product = cart.products.find(prod => prod._id = productID)
            if(product) {
                let item = product;
                item.quantity += parsedQuantity;
                item.stock -= parsedQuantity
                subtotal += subtotal
                product = item;
            } else {
                await cart.products.push({productID, title, parsedQuantity, price, color, size, image, stock, category});
            }
            cart.total += subtotal;
            await cart.save()
            res.redirect("/cart")
        } 
        else {
            const newCart = await new Cart({
                userEmail: userEmail,
                products: [{_id: productID, title, parsedQuantity, subtotal, price, color, size, image, stock, category}],
                total: subtotal
            });
            await newCart.save();
            res.redirect("/cart")
        }
    } catch (e) {
        res.json(e)
    }
}

const deleteProductOfCart = async (req, res) => {
    try {
        const userEmail = req.session.user
        const productID = req.params.id
        const cart = await Cart.findOne({userEmail: userEmail})
        
        if(cart) {
            const product = cart.products.find(prod => prod._id == productID)
            if(product) {
                if (product.quantity >= 1){
                    cart.total -= product.price;
                    cart.products.splice(cart.products[product], 1);
                } else return;
            }
            res.redirect("/cart")
        }

        res.redirect("/")
    } catch (e) {
        res.json(e)
    }
}

module.exports = {
    getUserCart,
    addProductToCart,
    deleteProductOfCart
}