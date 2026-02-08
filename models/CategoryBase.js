const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  model: String,
  description: String,
  features: [String],
  image: String,
});

const groupSchema = new mongoose.Schema({
  groupTitle: { type: String, required: true },
  items: [itemSchema],
});

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    shortDescription: String,
    groups: [groupSchema],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = categorySchema;