const express = require('express');
const router = express.Router();
const { getGallery } = require('../controllers/galleryController');

router.get('/', getGallery); // Publicly accessible

module.exports = router;