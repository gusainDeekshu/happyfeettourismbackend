const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  mediaUrl: { type: String, required: true },
  publicId: { type: String, required: true }, // Required for Cloudinary deletion
  resourceType: { 
    type: String, 
    enum: ['image', 'video'], 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);