// server/models/Project.js
const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String } // Optional, for future use
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);