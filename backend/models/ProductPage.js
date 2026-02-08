const mongoose = require('mongoose');
const categorySchema = require('./CategoryBase');

module.exports = mongoose.model('ProductPage', categorySchema);
