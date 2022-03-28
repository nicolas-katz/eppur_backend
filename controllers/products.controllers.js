// Imports
const Product = require('../models/Product')

// Get products functions
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).lean()
        const boolean = products.length >= 1
        return res.render('collections/all-products', {
            products: products,
            boolean: boolean,
            user: req.session.user
        })
    } catch (e) {
        return res.json(e)   
    }
}

// Get products by id functions
const getProductsById = async (req, res) => {
    try {
        const id = req.params.id
        const productById = await Product.findById({_id: id}).lean()
        const products = await Product.find({_id: productById}).lean()  
        return res.render("collections/details", {
            products: products,
            user: req.session.user
        }) 
    } catch (e) {
        res.render('404', {
            message: "El producto",
            path: "/collections/products",
            button_text: "PRODUCTOS"
        })
    }
}

// Get products by category functions
const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category
        const productByCategory = await Product.find({"category": category}).lean()
        const boolean = productByCategory.length >= 1
        if(category == "productos" || category == "outfits") {
            res.render("collections/products", {
                products: productByCategory,
                category: category,
                boolean: boolean,
                user: req.session.user
            })
        } else {
            res.render('404', {
                message: "La categoría",
                path: "/collections",
                button_text: "CATEGORÍAS"
            })
        }
    } catch (e) {
        res.json(e)
    }
}

// Get popular products functions
const getPopularProducts = async (req, res) => {
    try {
        const popularProduct = await Product.find({"isPopular": true}).lean()
        res.render("/", {
            products: popularProduct,
            user: req.session.user
        })
    } catch (e) {
        res.json(e)
    }
}

// Create products functions
const createProduct = async (req, res) => {
    try {
        const newProduct = await new Product(req.body)
        const savedProduct = await newProduct.save()
        res.json("Ok")
    } catch (e) {
        res.json(e)
    }
}

// Update products functions
const updateProductById = async (req, res) => {
    try {
        return await Product.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        })
    } catch (e) {
        res.json(e)
    }
}

// Delete products by id functions
const deleteProductById = async (req, res) => {
    try {
        return await Product.findByIdAndDelete({_id: req.params.id})
    } catch (e) {
        res.json(e)
    }
}

// Exports
module.exports = {
    getProducts,
    getProductsById,
    getProductsByCategory,
    getPopularProducts,
    createProduct,
    updateProductById,
    deleteProductById
}