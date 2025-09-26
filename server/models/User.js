// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // New fields for client gallery
  downloadLink: {
    type: String,
    required: false, // Not required for admin users
  },
  previewUrls: {
    type: [String], // An array of strings for photo URLs
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;