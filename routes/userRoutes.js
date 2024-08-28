const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getAllUsers, updateUserProfile } = require('../controllers/userController');
const router = express.Router();

router.get('/', protect, getAllUsers);  // This is where the error is likely occurring

router.put('/profile', protect, updateUserProfile);

module.exports = router;
