const asyncHandler = require('express-async-handler');
const ProductPage = require('../models/ProductPage');
const ServicePage = require('../models/ServicePage');

const getAllCategories = asyncHandler(async (req, res) => {
  const [products, services] = await Promise.all([
    ProductPage.find({})
      .select('title slug image shortDescription')
      .sort({ createdAt: -1 })
      .lean(),

    ServicePage.find({})
      .select('title slug image shortDescription')
      .sort({ createdAt: -1 })
      .lean(),
  ]);

  const formattedProducts = products.map(p => ({
    ...p,
    type: 'product',
  }));

  const formattedServices = services.map(s => ({
    ...s,
    type: 'service',
  }));
  res.status(200).json([
    ...formattedProducts,
    ...formattedServices,
  ]);
});

module.exports = {
  getAllCategories,
};
