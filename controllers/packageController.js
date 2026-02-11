const Package = require('../models/Package');
const cloudinary = require('cloudinary').v2;
// Get all packages for the user website
exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find({}).sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new package (Admin)
// @desc    Upload image to Cloudinary and Save Package to DB
// @route   POST /api/packages
// Replace your createPackage function with this:
exports.createPackage = async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    console.error("Backend Validation Error:", error);
    
    // Check if it is a Mongoose validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ 
        message: "Validation Failed", 
        errors: messages 
      });
    }

    // Check for duplicate key error (usually the slug)
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Duplicate Error", 
        errors: ["A package with this title or slug already exists."] 
      });
    }

    res.status(500).json({ message: error.message });
  }
};

const getPublicId = (url) => {
  try {
    if (!url || typeof url !== 'string') return null;
    return url.split('/').pop().split('.')[0];
  } catch (err) { return null; }
};

exports.updatePackage = async (req, res) => {
  try {
    const oldPkg = await Package.findById(req.params.id);
    if (!oldPkg) return res.status(404).json({ message: "Not found" });

    // Clean up old image if a new one is uploaded
    if (req.body.image && oldPkg.image !== req.body.image) {
      const oldId = getPublicId(oldPkg.image);
      if (oldId) cloudinary.uploader.destroy(oldId).catch(e => console.error("Cloudinary Error:", e));
    }

    const updated = await Package.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Not found" });

    const publicId = getPublicId(pkg.image);
    if (publicId) cloudinary.uploader.destroy(publicId).catch(e => console.error("Cloudinary Error:", e));

    await Package.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};