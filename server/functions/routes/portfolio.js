// server/routes/portfolio.js
const express = require('express');
const portfolioController = require('../controllers/portfolioController');  // correct
const router = express.Router();
const User = require('../models/User');  // FIX: one level up, not two

router.post('/upload', portfolioController.upload.single('image'), portfolioController.uploadImage);
router.get('/', portfolioController.getImages);
router.delete('/:id', portfolioController.deleteImage);

module.exports = router;