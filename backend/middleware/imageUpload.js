// middleware/imageUpload.js
const multer = require('multer');
const { uploadImage } = require('../utils/imageUpload');

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  },
});

const handleImageUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const result = await uploadImage(req.file.buffer);
    
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Image upload failed'
      });
    }

    // Add image URLs to request body
    req.body.profilePicture = result.imageUrl;
    req.body.profileThumbnail = result.thumbnailUrl;
    req.body.imageDeleteUrl = result.deleteUrl;

    next();
  } catch (error) {
    console.error('Image processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing image'
    });
  }
};

module.exports = {
  upload,
  handleImageUpload
};