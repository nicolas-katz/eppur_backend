// Imports
const Product = require('../models/Product')

// Get products functions
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        const boolean = products.length >= 1
        return res.render('collections/all-products', {
            products: products,
            banner: true,
            boolean: boolean
        })
    } catch (e) {
        return res.json(e)   
    }
}

// Get products by id functions
const getProductsById = async (req, res) => {
    try {
        const id = req.params.id
        const category = req.query.category
        const productById = await Product.findById({_id: id})
        const boolean = productById.length >= 1
        return res.render("collections/details", {
            products: productById,
            boolean: boolean,
            category: category,
            banner: false
        }) 
    } catch (e) {
        return res.json(e)
    }
}

// Get products by category functions
const getProductsByCategory = async (req, res) => {
    try {
        const category = req.query.category
        const productByCategory = await Product.find({"category": category})
        const boolean = productByCategory.length >= 1
        res.render("collections/products", {
            products: productByCategory,
            category: category,
            boolean: boolean,
            banner: true
        })
    } catch (e) {
        res.json(e)
    }
}

// Get popular products functions
const getPopularProducts = async (req, res) => {
    try {
        const popularProduct = await Product.find({"isPopular": true})
        res.render("/", {
            products: popularProduct,
            banner: true
        })
    } catch (e) {
        res.json(e)
    }
}

// Create products functions
const createProduct = async (req, res) => {
    try {
        const newProduct = await new Product(req.body)
        return await newProduct.save()
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