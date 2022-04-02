const express = require('express')
const { Router } = express
const router = Router()
const { showAllPhotos } = require('../controllers/gallery.controllers')

router.get('/', showAllPhotos)

// Exports
module.exports = router