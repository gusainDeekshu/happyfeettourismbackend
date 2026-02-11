const express = require('express');
const router = express.Router();
const { getGallery, addGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware'); // Ensure you have auth protection

// Admin needs to 'get' the items to see them in the dashboard
router.get('/', protect, getGallery);
router.post('/', protect, addGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;