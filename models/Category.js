const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String },
  // NEW FIELD: Distinguishes between Product and Service categories
  type: { 
    type: String, 
    enum: ['product', 'service'], 
    default: 'product',
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);