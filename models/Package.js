const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true }, // e.g., "5 Days / 4 Nights"
  location: { type: String, required: true },
  image: { type: String, required: true }, // Store Cloudinary URL here
  category: { 
    type: String, 
    enum: ['Group Tour', 'Honeymoon', 'Adventure', 'Cultural', 'Family'],
    required: true 
  },
  itinerary: [itinerarySchema],
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);