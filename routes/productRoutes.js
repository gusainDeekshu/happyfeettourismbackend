const express = require('express');
const router = express.Router();

const {
  getHomeSections,
  getProductPages,
  getServicePages,
  getProductBySlug,
  getServiceBySlug,
  getProjects,
} = require('../controllers/productController');

router.get('/home-sections', getHomeSections);

router.get('/product-pages', getProductPages);
router.get('/service-pages', getServicePages);

router.get('/products/:slug', getProductBySlug);
router.get('/services/:slug', getServiceBySlug);

router.get('/projects', getProjects);

module.exports = router;
