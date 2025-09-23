// server/routes/admin.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/create-client', async (req, res) => {
  try {
    const { username, password, galleryUrl } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      galleryUrl,
      // You will need logic here to fetch and save previewUrls from the galleryUrl
    });

    await newUser.save();
    res.status(201).json({ message: 'Client account created successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating account.' });
  }
});

module.exports = router;