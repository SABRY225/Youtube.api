const User = require('../models/userModel');
const Video = require('../models/videoModel');
const Playlist = require('../models/playlistModel');

// Get all users
const getUsers = async (req, res) => {
    const userId = req.userId;
    try {
        const users = await User.find({ _id: { $ne: userId }, role: { $ne: 'Admin' } });
        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users.map(user => ({
            id: user._id,
            role: user.role,
            userName: user.userName,
            email: user.email,
            profilePicture: user.profilePicture,
            dateOfBirth: user.dateOfBirth,
            country: user.country
        })));
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
        res.status(200).json({id:user._id,role:user.role,userName:user.userName,email:user.email,profilePicture:user.profilePicture,dateOfBirth:user.dateOfBirth,country:user.country,backgroundUser:user.backgroundUser});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
    const  {userId}  = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }
        res.status(200).json({id:user._id,role:user.role,userName:user.userName,email:user.email,profilePicture:user.profilePicture,dateOfBirth:user.dateOfBirth,country:user.country,backgroundUser:user.backgroundUser});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    const { userName, dateOfBirth, profilePicture, country ,backgroundUser} = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.userName = userName || user.userName;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;
        user.backgroundUser = backgroundUser || user.backgroundUser;
        user.profilePicture = profilePicture || user.profilePicture;
        user.country = country || user.country;
        user.updatedAt = new Date();

        await user.save();
        res.status(200).json({ message: 'updating user successfully', success: true  });
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', success: false  });
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
        res.status(200).json({ message: 'User deleted successfully', success: true  });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user',  success: false });
    }
};
// count of USer and Video and Playlist

const getCounts = async (req, res) => {
    try {
        // Fetch counts from each collection
        const userCount = await User.countDocuments();
        const videoCount = await Video.countDocuments();
        const playlistCount = await Playlist.countDocuments();

        // Return the counts in JSON format
        res.status(200).json({
            userCount,
            videoCount,
            playlistCount
        });
    } catch (error) {
        // Handle errors
        console.error('Error fetching counts:', error);
        res.status(500).json({
            message: 'Error fetching counts',
            success: false,
        });
    }
};


module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getCounts,
    getUserById
};
