const asyncHandler = require('express-async-handler');
const ServicePage = require('../models/ServicePage');

/*
  GET ALL SERVICE CATEGORIES
*/
const getServicePages = asyncHandler(async (req, res) => {
  const pages = await ServicePage.find({})
    .select('title slug image shortDescription type isFeatured')
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json(pages);
});

/*
  GET SINGLE SERVICE CATEGORY BY SLUG
*/
const getServiceBySlug = asyncHandler(async (req, res) => {
  const page = await ServicePage.findOne({ slug: req.params.slug }).lean();

  if (!page) {
    return res.status(404).json({ message: 'Service category not found' });
  }

  page.groups = page.groups || [];

  res.status(200).json(page);
});

module.exports = {
  getServicePages,
  getServiceBySlug,
};
