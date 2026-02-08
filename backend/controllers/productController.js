const asyncHandler = require('express-async-handler');
const ProductPage = require('../models/ProductPage');
const ServicePage = require('../models/ServicePage');
const Project = require('../models/Project');

/*
   HOME SECTIONS (FEATURED) */
const getHomeSections = asyncHandler(async (req, res) => {
  const [products, services] = await Promise.all([
    ProductPage.find({ isFeatured: true })
      .select('title slug image shortDescription')
      .sort({ createdAt: -1 })
      .limit(8)
      .lean(),

    ServicePage.find({ isFeatured: true })
      .select('title slug image shortDescription')
      .sort({ createdAt: -1 })
      .limit(8)
      .lean(),
  ]);

  const finalProducts =
    products.length > 0
      ? products
      : await ProductPage.find({})
          .select('title slug image shortDescription')
          .sort({ createdAt: -1 })
          .limit(6)
          .lean();

  const finalServices =
    services.length > 0
      ? services
      : await ServicePage.find({})
          .select('title slug image shortDescription')
          .sort({ createdAt: -1 })
          .limit(6)
          .lean();

  res.status(200).json({
    products: finalProducts,
    services: finalServices,
  });
});


/*
   ALL PRODUCT CATEGORIES */
const getProductPages = asyncHandler(async (req, res) => {
  const pages = await ProductPage.find({})
    .select('title slug image shortDescription isFeatured')
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json(pages);
});


/*
   ALL SERVICE CATEGORIES */
const getServicePages = asyncHandler(async (req, res) => {
  const pages = await ServicePage.find({})
    .select('title slug image shortDescription isFeatured')
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json(pages);
});


/*
   SINGLE PRODUCT CATEGORY */
const getProductBySlug = asyncHandler(async (req, res) => {
  const page = await ProductPage.findOne({ slug: req.params.slug })
    .lean();

  if (!page) {
    return res.status(404).json({ message: 'Product category not found' });
  }

  page.groups = page.groups || [];

  res.status(200).json(page);
});


/*
   SINGLE SERVICE CATEGORY */
const getServiceBySlug = asyncHandler(async (req, res) => {
  const page = await ServicePage.findOne({ slug: req.params.slug })
    .lean();

  if (!page) {
    return res.status(404).json({ message: 'Service category not found' });
  }

  page.groups = page.groups || [];

  res.status(200).json(page);
});


/*
   PROJECTS */
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).lean();
  res.status(200).json(projects);
});

module.exports = {
  getHomeSections,
  getProductPages,
  getServicePages,
  getProductBySlug,
  getServiceBySlug,
  getProjects,
};
