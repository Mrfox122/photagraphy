
// server/routes/admin.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const router = express.Router();

// Route to create a new client
router.post('/create-client', async (req, res) => {
  try {
    const { username, password, downloadLink, previewUrls } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      downloadLink,
      previewUrls,
      isAdmin: false, // New clients are not admins
    });

    await newUser.save();
    res.status(201).json({ message: 'Client account created successfully!' });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating account.' });
  }
});

module.exports = router;