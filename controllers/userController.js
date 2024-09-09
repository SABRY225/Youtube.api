const User = require('../models/userModel');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Get a specific user by ID
const getUser = async (req, res) => {
    const  userId  = req.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { userName, dateOfBirth, email, password, profilePicture, country } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (password) {
            user.password = password;  // Password will be hashed in pre-save middleware
        }
        user.userName = userName || user.userName;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;
        user.email = email || user.email;
        user.profilePicture = profilePicture || user.profilePicture;
        user.country = country || user.country;
        user.updatedAt = new Date();

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser
};
