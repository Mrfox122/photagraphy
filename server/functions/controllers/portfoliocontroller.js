const cloudinary = require('../config/cloudinary'); // config folder under functions
const Portfolio = require('../../models/portfolio'); // models folder one level above functions
const multer = require('multer');

// Multer setup
const storage = multer.memoryStorage();
exports.upload = multer({ storage });

// Upload a new image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, { folder: 'portfolio' });

    const newPortfolioItem = new Portfolio({
      title: req.body.title || 'Untitled',
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });

    await newPortfolioItem.save();
    res.status(201).json({ message: 'Image uploaded successfully!', data: newPortfolioItem });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Error uploading image.' });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    console.error('Get Images Error:', error);
    res.status(500).json({ message: 'Error fetching images.' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolioItem = await Portfolio.findById(id);
    if (!portfolioItem) return res.status(404).json({ message: 'Image not found.' });

    await cloudinary.uploader.destroy(portfolioItem.publicId);
    await Portfolio.deleteOne({ _id: id });
    res.status(200).json({ message: 'Image deleted successfully!' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Error deleting image.' });
  }
};
