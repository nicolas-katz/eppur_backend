// Imports
const Product = require('../models/Product')

// Get products functions
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        return res.json(products)
    } catch (e) {
        return res.json(e)   
    }
}

// Get products by id functions
const getProductsById = async (req, res) => {
    try {
        const id = req.params.id
        if(id === undefined) return res.json("No hemos podido encontrar tu producto")
        const productById = await Product.findById({_id: id})
        if(productById === undefined) return res.json("No hemos podido encontrar tu producto")
        return res.json(productById) 
    } catch (e) {
        return res.json(e)
    }
}

// Get products by category functions
const getProductsByCategory = async (req, res) => {
    const productByCategory = await Product.find({}).where('category', '===', req.query.category)
    res.json(productByCategory)
}

// Get popular products functions
const getPopularProducts = async (req, res) => {
    const popularProduct = await Product.find({}).where('isPopular', '===', true)
    res.json(popularProduct)
}

// Create products functions
const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
    } catch (e) {
        res.json(e)
    }
}

// Update products functions
const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true
    })
    res.json(updatedProduct)
}

// Delete products by id functions
const deleteProductById = async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete({_id: req.params.id})
    res.json(deletedProduct)
}

// Delete products functions
const deleteProducts = async (req, res) => {
    try {
        const deletedProduct = await Product.deleteMany({})
        if(!deletedProduct) return res.json("Hubo un error eliminando todos los productos")
        return res.json(deletedProduct)
    } catch (e) {
        return res.json(e)
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
    deleteProductById,
    deleteProducts
}