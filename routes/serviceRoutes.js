const express = require('express');
const router = express.Router();

const {
  getServicePages,
  getServiceBySlug,
} = require('../controllers/serviceController');

router.get('/service-pages', getServicePages);
router.get('/services/:slug', getServiceBySlug);

module.exports = router;
