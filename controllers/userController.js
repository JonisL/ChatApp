const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password field
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUserProfile = async (req, res) => {
    // The existing update profile logic
};

module.exports = { getAllUsers, updateUserProfile };
