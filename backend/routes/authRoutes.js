// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { upload, handleImageUpload } = require('../middleware/imageUpload');
const { protect } = require('../middleware/authMiddleware');
const {
  register,
  login,
  getMe,
  updateProfile,
  updatePassword
} = require('../controllers/authController');

router.post('/register', upload.single('profilePicture'), handleImageUpload, register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/update-profile', protect, upload.single('profilePicture'), handleImageUpload, updateProfile);
router.put('/update-password', protect, updatePassword);

module.exports = router;