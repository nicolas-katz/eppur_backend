const Gallery = require("../models/Gallery")

const showAllPhotos = async (req, res) => {
   try {
        const photos = await Gallery.find({}).lean()
        const boolean = photos.length >= 1
        return res.render('gallery', {
            photos: photos,
            boolean: boolean,
            user: req.session.user
        })
   } catch (e) {
        res.redirect("/")
}
}

const getAllPhotos = async (req, res) => {
    try {
         const photos = await Gallery.find({}).lean()
         return res.render('account/admin/gallery', {
             photos: photos,
             user: req.session.user
         })
    } catch (e) {
        res.redirect("/")
    }
}

const createPhoto = async (req, res) => {
    try {
        const newPhoto = await new Gallery(req.body)
        if(req.file) {
            newPhoto.image = req.file.filename
        }
        await newPhoto.save()
        req.flash("success_msg", "Se ha creado correctamente.");
        res.redirect('/mi-cuenta/administrador/galeria')
    } catch (e) {
        res.redirect("/")
    }
}

const updatePhotoById = async (req, res) => {
    try {
        const updatedPhoto = req.body
        if(req.file) {
            updatedPhoto.image = req.file.filename
        }
        console.log(req.body)
        await Gallery.findByIdAndUpdate({_id: req.params.id}, updatedPhoto, {
            new: true,
            runValidators: true
        })
        req.flash("success_msg", "Se ha modificado correctamente.");
        res.redirect("/mi-cuenta/administrador/galeria")
    } catch (e) {
        res.redirect("/")
    }
}

const deletePhotoById = async (req, res) => {
    try {
        await Gallery.findByIdAndDelete({_id: req.params.id})
        req.flash("success_msg", "Se ha eliminado correctamente.");
        res.redirect("/mi-cuenta/administrador/galeria")
    } catch (e) {
        res.redirect("/")
    }
}

module.exports = {
    showAllPhotos,
    getAllPhotos,
    createPhoto,
    updatePhotoById,
    deletePhotoById
}