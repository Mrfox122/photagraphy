// server/routes/gallery.js
const express = require('express');
const router = express.Router();

module.exports = router;


// Route to get a client's gallery data
router.get('/', async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ message: 'Username parameter is missing.' });
    }

    const user = await User.findOne({ username });

    if (!user || user.isAdmin) {
      return res.status(404).json({ message: 'Gallery not found or access denied.' });
    }

    // Return the gallery data
    res.status(200).json({
      previewUrls: user.previewUrls,
      downloadLink: user.downloadLink,
    });

  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ message: 'Error fetching gallery data.' });
  }
});

module.exports = router;