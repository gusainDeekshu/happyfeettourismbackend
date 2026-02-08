const Category = require('../models/Category');
const Project = require('../models/Project');
const ProductPage = require('../models/ProductPage');
const ServicePage = require('../models/ServicePage');

// Map URL segments to Mongoose Models
const getModel = (type) => {
  switch (type) {
    case 'categories': return Category;
    case 'projects': return Project;
    case 'products': return ProductPage;
    case 'services': return ServicePage;
    default: return null;
  }
};

// @desc    Get All Items
// @route   GET /api/content/:type
exports.getAll = async (req, res) => {
  const Model = getModel(req.params.type);
  if (!Model) return res.status(400).json({ message: 'Invalid Resource Type' });

  try {
    const items = await Model.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Single Item
// @route   GET /api/content/:type/:id
exports.getOne = async (req, res) => {
  const Model = getModel(req.params.type);
  if (!Model) return res.status(400).json({ message: 'Invalid Resource Type' });

  try {
    const item = await Model.findById(req.params.id);
    if (item) res.json(item);
    else res.status(404).json({ message: 'Item not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Item
// @route   POST /api/content/:type
exports.createOne = async (req, res) => {
  const Model = getModel(req.params.type);
  if (!Model) return res.status(400).json({ message: 'Invalid Resource Type' });

  try {
    const newItem = await Model.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update Item
// @route   PUT /api/content/:type/:id
exports.updateOne = async (req, res) => {
  const Model = getModel(req.params.type);
  if (!Model) return res.status(400).json({ message: 'Invalid Resource Type' });

  try {
    const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete Item
// @route   DELETE /api/content/:type/:id
exports.deleteOne = async (req, res) => {
  const Model = getModel(req.params.type);
  if (!Model) return res.status(400).json({ message: 'Invalid Resource Type' });

  try {
    await Model.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle Featured Flag
// @route   PATCH /api/content/:type/:id/featured
exports.toggleFeatured = async (req, res) => {
  const Model = getModel(req.params.type);
  if (!Model) return res.status(400).json({ message: 'Invalid Resource Type' });

  const { isFeatured } = req.body;

  try {

    if (isFeatured) {
  const count = await Model.countDocuments({ isFeatured: true });
  if (count >= 8) {
    return res.status(400).json({ message: 'Max featured limit reached' });
  }
}
    const item = await Model.findByIdAndUpdate(
      req.params.id,
      { isFeatured },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
