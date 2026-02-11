const Gallery = require('../models/Gallery');
const cloudinary = require('cloudinary').v2;

// @desc    Get all gallery items (Public & Admin)
exports.getGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new gallery item (Admin)
exports.addGalleryItem = async (req, res) => {
  try {
    const newItem = await Gallery.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete gallery item & clean Cloudinary (Admin)
exports.deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Media not found" });

    // Production-grade: Delete from Cloudinary using resourceType
    await cloudinary.uploader.destroy(item.publicId, { 
      resource_type: item.resourceType 
    });

    await item.deleteOne();
    res.status(200).json({ message: "Media deleted from DB and Cloudinary" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};