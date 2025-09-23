// server/models/Portfolio.js
const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  publicId: { // This is needed to delete from Cloudinary later
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Portfolio;