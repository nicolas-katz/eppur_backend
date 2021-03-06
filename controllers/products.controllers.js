const Product = require('../models/Product')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).lean()
        const boolean = products.length >= 1
        return res.render('collections/products', {
            products: products,
            boolean: boolean,
            user: req.session.user,
            title: "Colección Eppur",
            isAllProducts: true
        })
    } catch (e) {
        res.redirect("/")
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
        res.redirect("/")
    }
}

const getProductsById = async (req, res) => {
    try {
        const id = req.params.id
        const productById = await Product.findById({_id: id}).lean()
        const products = await Product.findOne({_id: productById}).lean()  
        const stock = products.stock > 0
        return res.render("collections/details", {
            products: products,
            user: req.session.user,
            stock: stock
        }) 
    } catch (e) {
        res.render('404', {
            message: "El producto",
            path: "/coleccion-eppur",
            button_text: "Productos"
        })
    }
}

const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category
        const productsByCategory = await Product.find({category: category}).lean()
        const boolean = productsByCategory.length >= 1
        if(category == "buzos" || category == "remeras" || category == "pantalones" || category == "bermudas" || category == "boinas" || category == "accesorios") {
            res.render("collections/products", {
                products: productsByCategory,
                boolean: boolean,
                user: req.session.user,
                title: category,
                isCategory: true
            })
        } else {
            res.render('404', {
                message: "La categoría",
                path: "/coleccion-eppur",
                button_text: "Productos"
            })
        }
    } catch (e) {
        res.redirect("/")
    }
}

const getProductsByColor = async (req, res) => {
    try {
        const color = req.params.color
        const productsByColor = await Product.find({color: color}).lean()
        const boolean = productsByColor.length >= 1
        if(color == "negro" || color == "blanco" || color == "gris" || color == "beige") {
            res.render("collections/products", {
                products: productsByColor,
                boolean: boolean,
                user: req.session.user,
                title: color,
                isColor: true
            })
        } else {
            res.render('404', {
                message: "El color",
                path: "/coleccion-eppur",
                button_text: "Productos"
            })
        }
    } catch (e) {
        res.redirect("/")
    }
}

// Get products by size functions
const getProductsBySize = async (req, res) => {
    try {
        const size = req.params.size
        const productsBySize = await Product.find({size: size}).lean()
        const boolean = productsBySize.length >= 1
        if(size == "small" || size == "medium" || size == "large") {
            res.render("collections/products", {
                products: productsBySize,
                boolean: boolean,
                user: req.session.user,
                title: size,
                isSize: true
            })
        } else {
            res.render('404', {
                message: "El talle",
                path: "/coleccion-eppur",
                button_text: "Productos"
            })
        }
    } catch (e) {
        res.redirect("/")
    }
}

// Create products functions
const createProduct = async (req, res) => {
    try {
        const newProduct = await new Product(req.body)
        if(req.file) {
            newProduct.image = req.file.filename
        }
        await newProduct.save()
        req.flash("success_msg", "Se ha creado correctamente.");
        res.redirect("/mi-cuenta/administrador/productos")
    } catch (e) {
        res.redirect("/como-comprar")
    }
}

const updateProductById = async (req, res) => {
    try {
        const updatedProduct = req.body
        if(req.file) {
            updatedProduct.image = req.file.filename
        }
        await Product.findByIdAndUpdate({_id: req.params.id}, updatedProduct, {
            new: true,
            runValidators: true
        })
        req.flash("success_msg", "Se ha modificado correctamente.");
        res.redirect("/mi-cuenta/administrador/productos")
    } catch (e) {
        res.redirect("/")
    }
}

const deleteProductById = async (req, res) => {
    try {
        await Product.findByIdAndDelete({_id: req.params.id})
        req.flash("success_msg", "Se ha eliminado correctamente.");
        res.redirect("/mi-cuenta/administrador/productos")
    } catch (e) {
        res.redirect("/")
    }
}

module.exports = {
    getProducts,
    getAllProducts,
    getProductsById,
    getProductsByCategory,
    getProductsByColor,
    getProductsBySize,
    createProduct,
    updateProductById,
    deleteProductById
}