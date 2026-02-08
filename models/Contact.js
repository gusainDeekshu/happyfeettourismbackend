const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  projectType: { type: String },
  budget: { type: String },
  message: { type: String, required: true },
  subscribe: { type: Boolean, default: false },
  
  // --- REQUIRED FOR ADMIN PANEL ---
  status: { 
    type: String, 
    enum: ['Pending', 'Contacted', 'Completed'], 
    default: 'Pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);