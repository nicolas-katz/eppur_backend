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
       res.json(e)
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
        res.json(e)
    }
}

const createPhoto = async (req, res) => {
    try {
        const { email, image } = req.body
        const newPhoto = await new Gallery({email, image})
        await newPhoto.save()
        res.redirect('/account/administrator/galeria')
    } catch (e) {
        res.json(e)
    }
}

const updatePhotoById = async (req, res) => {
    try {
        await Gallery.findByIdAndDelete({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        })
    } catch (e) {
        res.json(e)
    }
}

const deletePhotoById = async (req, res) => {
    try {
        await Gallery.findByIdAndDelete({_id: req.params.id})
    } catch (e) {
        res.json(e)
    }
}

module.exports = {
    showAllPhotos,
    getAllPhotos,
    createPhoto,
    updatePhotoById,
    deletePhotoById
}