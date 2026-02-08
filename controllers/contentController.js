// backend/controllers/contentController.js
const Package = require('../models/Package');
const Project = require('../models/Project'); // Used for Travel Gallery
const ServicePage = require('../models/ServicePage');

const getModel = (type) => {
  switch (type) {
    case 'packages': return Package;
    case 'gallery': return Project;
    case 'services': return ServicePage;
    default: return null;
  }
};

exports.getAll = async (req, res) => {
  const Model = getModel(req.params.type);
  if (!Model) return res.status(400).json({ message: 'Invalid Type' });
  try {
    const items = await Model.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// backend/controllers/contentController.js
exports.createOne = async (req, res) => {
  const Model = getModel(req.params.type);
  try {
    const newItem = await Model.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Validation Error:", error.message); // This will show the exact field error in your terminal
    res.status(400).json({ message: error.message });
  }
};
// ... Add updateOne and deleteOne similarly
// UPDATE existing travel content (Admin only)
exports.updateOne = async (req, res) => {
  const Model = getModel(req.params.type);
  try {
    const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE travel content (Admin only)
exports.deleteOne = async (req, res) => {
  const Model = getModel(req.params.type);
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};