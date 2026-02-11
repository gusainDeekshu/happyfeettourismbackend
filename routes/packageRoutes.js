const express = require('express');
const router = express.Router();
const { 
  getPackages, 
  createPackage, 
  updatePackage, 
  deletePackage,
  getPackageBySlug 
} = require('../controllers/packageController');
const { protect } = require('../middleware/authMiddleware');

// Public route for the website
router.get('/', getPackages);

// Protected routes for the Admin Panel
router.post('/', protect, createPackage);
router.put('/:id', protect, updatePackage);
router.delete('/:id', protect, deletePackage);
router.get('/:slug', getPackageBySlug);
module.exports = router;