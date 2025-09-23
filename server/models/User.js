// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  galleryUrl: { type: String, required: true },
  previewUrls: [String] // Array of URLs for preview images
});

module.exports = mongoose.model('User', UserSchema);