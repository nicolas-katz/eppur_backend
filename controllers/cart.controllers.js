const Auth = require('../models/Auth')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const formatterDolar = require('../libs/formatPrices')

const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({userEmail: req.session.user}).lean() || null
        if(cart != null) {
            res.render('cart/cart', {
                cartProducts: cart.products,
                cartTotal: cart.total,
                user: req.session.user,
                userID: req.session._id
            })
        } else {
            res.render('cart/cart', {
                user: req.session.user
            })
        }
    } catch (e) {
        res.redirect("/")
    }
}

const addProductToCart = async (req, res) => {
    try {
        const { productID, count } = req.body
        const _count = Number(count)
        const cart = await Cart.findOne({userEmail: req.session.user}) || null
        const product = await Product.findOne({_id: productID}) || null
        if(cart != null) {
            const _product = cart.products.find(prod => prod._id == productID) || null
            if(_product != null) {
                _product.quantity += _count
                _product.subtotal += _product.price * _count
                _product.stock -= _count
                product.stock -= _count
                cart.total += _product.price * _count
            } 
            else {
                await cart.products.push({
                    _id: productID,
                    title: product.title,
                    price: product.price,
                    quantity: _count,
                    subtotal: product.price * _count,
                    category: product.category,
                    color: product.color,
                    size: product.size,
                    image: product.image,
                    stock: product.stock - _count
                })
                cart.total += product.price * _count
                product.stock -= _count
            }
            await cart.save()
            await product.save()
            req.flash("success_msg", `Se ha agregado correctamente el producto seleccionado.`)
            res.redirect("/carrito")
        } else {
            const newCart = await new Cart({
                userID: req.session._id,
                userEmail: req.session.user,
                products: [{
                    title: product.title,
                    price: product.price,
                    category: product.category,
                    color: product.color,
                    size: product.size,
                    image: product.image,
                    _id: productID,
                    quantity: _count,
                    subtotal: product.price * _count,
                    stock: product.stock - _count
                }],
                total: product.price * _count
            })
            product.stock -= _count
            await newCart.save()
            await product.save()
            req.flash("success_msg", `Se ha agregado correctamente el producto seleccionado.`)
            res.redirect("/carrito")
        }
    } catch (e) {
        res.redirect("/")
    }
}

const addOneProduct = async (req, res) => {
    try {
        const cart = await Cart.findOne({userEmail: req.session.user}) || null
        const product = await Product.findOne({_id: req.params.id}) || null
        const item = cart.products.find(prod => prod._id == req.params.id) || null
        if(cart != null) {
            if(product != null && item != null) {
                if(product.stock > 0) {
                    product.stock -= 1
                    item.quantity += 1
                    item.stock -= 1
                    item.subtotal += item.price
                    cart.total += item.price
                    await product.save()
                    await cart.save()
                    req.flash('success_msg', 'Se ha actualizado tu carrito.')
                    res.redirect("/carrito")
                } else {
                    req.flash('error_msg', 'Lo sentimos. No hay m??s stock.')
                    res.redirect("/carrito")
                }
            } else return;
        } else return;
    } catch (e) {
        res.redirect("/")
    }
}

const removeOneProduct = async (req, res) => {
    try {
        const cart = await Cart.findOne({userEmail: req.session.user}) || null
        const product = await Product.findOne({_id: req.params.id}) || null
        const item = cart.products.find(prod => prod._id == req.params.id) || null
        const itemIndex = cart.products.findIndex(prod => prod._id == req.params.id) || null
        if(cart != null) {
            if(product != null && item != null && itemIndex > -1) {
                if(item.quantity > 1) {
                    product.stock += 1
                    item.quantity -= 1
                    item.stock += 1
                    item.subtotal -= item.price
                    cart.total -= item.price
                    await product.save()
                    await cart.save()
                    req.flash('success_msg', 'Se ha actualizado tu carrito.')
                    res.redirect("/carrito")
                } else {
                    product.stock += item.quantity
                    cart.total -= item.subtotal
                    cart.products.splice(itemIndex, 1)
                    await product.save()
                    await cart.save()
                    req.flash('success_msg', 'Se ha removido un producto de tu carrito.')
                    res.redirect("/carrito")
                }
            } else {
                req.flash('error_msg', 'Lo sentimos. Ocurrio un error al actualizar el carrito.')
            };
        } else return;
    } catch (e) {
        res.redirect("/")
    }
}

const removeProductOfCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({userEmail: req.session.user}) || null
        const product = await Product.findOne({_id: req.params.id}) || null
        const item = cart.products.find(prod => prod._id == req.params.id) || null
        const itemIndex = cart.products.findIndex(prod => prod._id == req.params.id) || null
        if(cart != null) {
            if(product != null && item != null && itemIndex > -1) {
                product.stock += item.quantity
                cart.total -= item.subtotal
                cart.products.splice(itemIndex, 1)
                await product.save()
                await cart.save()
                req.flash('success_msg', 'Se ha removido un producto de tu carrito.')
                res.redirect("/carrito")
            } else {
                req.flash('error_msg', 'Lo sentimos. Ocurrio un error al actualizar el carrito.')
            };
        } else return;
    } catch (e) {
        res.redirect("/")
    }
}

module.exports = {
    getUserCart,
    addProductToCart,
    removeProductOfCart,
    addOneProduct,
    removeOneProduct
}