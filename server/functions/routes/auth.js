// server/functions/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User'); // models folder is two levels up
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Add this line to see the data the server is receiving
  console.log('Login attempt with:', req.body);
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Check if the user is an admin
    if (user.isAdmin) {
      res.status(200).json({ message: 'Admin login successful.', redirect: '/admin-panel.html' });
    } else {
      res.status(200).json({ message: 'Client login successful.', redirect: `/client-gallery.html?username=${user.username}` });
    }

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// The router must be exported after the routes have been defined
module.exports = router;