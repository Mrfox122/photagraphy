// server/routes/portfolio.js
const express = require('express');
const portfolioController = require('../controllers/portfolioController');
const router = express.Router();

router.post('/upload', portfolioController.upload.single('image'), portfolioController.uploadImage);
router.get('/', portfolioController.getImages);
router.delete('/:id', portfolioController.deleteImage);

module.exports = router;