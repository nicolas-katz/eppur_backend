// Imports
const Product = require('../models/Product')

// Get products by collection functions
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).lean()
        const boolean = products.length >= 1
        return res.render('collections/products', {
            products: products,
            boolean: boolean,
            user: req.session.user,
            title: "TODOS LOS PRODUCTOS"
        })
    } catch (e) {
        return res.json(e)   
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).lean()
        return res.render('account/admin/products', {
            products: products,
            user: req.session.user,
        })
    } catch (e) {
        return res.json(e)   
    }
}

const getOutfits = async (req, res) => {
    try {
        const products = await Product.find({}).lean()
        const boolean = products.length >= 1
        return res.render('collections/outfits', {
            products: products,
            boolean: boolean,
            user: req.session.user,
            title: "TODOS LOS OUTFITS"
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
        const productsByCategory = await Product.find({category: category}).lean()
        const boolean = productsByCategory.length >= 1
        if(category == "remeras" || category == "pantalones" || category == "accesorios") {
            res.render("collections/products", {
                products: productsByCategory,
                boolean: boolean,
                user: req.session.user,
                title: category.toUpperCase()
            })
        } else {
            res.render('404', {
                message: "La categoría",
                path: "/collections",
                button_text: "COLECCIONES"
            })
        }
    } catch (e) {
        res.json(e)
    }
}

// Create products functions
const createProduct = async (req, res) => {
    try {
        const newProduct = await new Product(req.body)
        await newProduct.save()
    } catch (e) {
        res.json(e)
    }
}

// Update products functions
const updateProductById = async (req, res) => {
    try {
        await Product.findByIdAndUpdate({_id: req.params.id}, req.body, {
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
        await Product.findByIdAndDelete({_id: req.params.id})
    } catch (e) {
        res.json(e)
    }
}

// Exports
module.exports = {
    getProducts,
    getAllProducts,
    getOutfits,
    getProductsById,
    getProductsByCategory,
    createProduct,
    updateProductById,
    deleteProductById
}