// server/functions/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User'); 
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // LOG 1: Check what data the server is receiving
  console.log('Login attempt with:', req.body);
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      // LOG 2: If the user isn't found
      console.log('User not found:', username);
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // LOG 3: Check the password hash comparison
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Check if the user is an admin
    if (user.isAdmin) {
      console.log('Admin login successful for:', username);
      res.status(200).json({ message: 'Admin login successful.', redirect: '/admin-panel.html' });
    } else {
      console.log('Client login successful for:', username);
      res.status(200).json({ message: 'Client login successful.', redirect: `/client-gallery.html?username=${user.username}` });
    }

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

module.exports = router;