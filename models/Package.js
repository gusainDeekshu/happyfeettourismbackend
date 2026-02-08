// backend/models/Package.js
const mongoose = require('mongoose');

const itineraryItemSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Day 1: Arrival"
  description: String,
  image: String,
  features: [String], // e.g., ["Breakfast Included", "Guided Tour"]
});

const itineraryGroupSchema = new mongoose.Schema({
  groupTitle: { type: String, required: true }, // e.g., "Main Itinerary"
  items: [itineraryItemSchema],
});

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  shortDescription: String,
  itinerary: [itineraryGroupSchema], // Replaces 'groups'
  isFeatured: { type: Boolean, default: false },
  price: String,
  duration: String,
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);