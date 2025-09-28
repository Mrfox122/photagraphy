// server/routes/portfolio.js
const express = require('express');
const portfolioController = require('../controllers/portfoliocontroller'); // controllers folder
const router = express.Router();

module.exports = router;


router.post('/upload', portfolioController.upload.single('image'), portfolioController.uploadImage);
router.get('/', portfolioController.getImages);
router.delete('/:id', portfolioController.deleteImage);

module.exports = router;