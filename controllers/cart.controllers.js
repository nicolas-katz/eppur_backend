const Auth = require('../models/Auth')
const Cart = require('../models/Cart')
const Product = require('../models/Product')

const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({_id: req.params.id})
        const boolean = cart.length >= 1
        res.render('cart/cart', {
            cart: cart,
            boolean: boolean,
            user: req.session.user
        })
    } catch (e) {
        res.json(e)
    }
}

const addProductToCart = async (req, res) => {
    try {
        const isAdmin = await Auth.findOne({role: "admin"})
        if(!req.user) {
            res.redirect('/account/login')
        } else {
            if(isAdmin) return;
            else {
                const { userID, userEmail, productID, quantity } = req.body

            let cart = await Cart.findOne({_id: userID})
            let product = await Product.findOne({_id: productID})
        
            if(!product) {
                res.status(400).json('Not Found Product')
            }

            let title = product.title
            let category = product.category
            let price = product.price
            let color = product.color
            let description = product.description
            let sizes = product.sizes
            let image = product.image
            let images = product.images
        
            if(cart) {
                let index = cart.products.indexOf(prod => prod._id == productID);
                if(index > -1) {
                    let item = cart.products[index];
                    item.quantity += quantity;
                    cart.products[item] = item;
                } else {
                    cart.products.push({productID, title, quantity, price, color, sizes, image, images, category, description});
                }
        
                cart.total += quantity * price;
        
                await cart.save()
                res.redirect("/")
            } else {
                const newCart = await new Cart({
                    userEmail,
                    userID,
                    products: [{productID, title, quantity, price, color, description, sizes, image, images, category}],
                    total: quantity * price
                });
                
                await newCart.save();
                res.redirect("/")
            }
        }
            }
    } catch (e) {
        res.json(e)
    }
}

const deleteProductOfCart = async (req, res) => {
    try {    
        let cart = await carritoModel.findOne({_id : req.body.userID});
        let index = await cart.products.findIndex(prod => prod._id == req.params.id);
    
        if(index > -1) {
            let item = cart.products[index];
    
            if (item.quantity > 1){
                item.quantity -= 1;
                cart.total -= item.quantity * item.price;
            } else return;
        } 
    
        await cart.save();
        res.redirect(process.cwd())
    } catch (e) {
        res.json(e)
    }
}

const deleteAllProduct = async (req, res) => {
    try {
        try {    
            let cart = await Cart.findOne({_id : req.body.userID});
            let index = await cart.products.findIndex(prod => prod._id == req.params.id);
        
            if(index > -1) {
                let item = cart.products[index];
        
                if (item.quantity >= 1){
                    cart.total -= item.price;
                    cart.products.splice(index, 1);
                } else return;
            } 
        
            await cart.save();
            res.redirect(process.cwd())
        } catch (e) {
            res.json(e)
        }
    } catch (e) {
        res.json(e)
    }
}

module.exports = {
    getUserCart,
    addProductToCart,
    deleteProductOfCart,
    deleteAllProduct
}