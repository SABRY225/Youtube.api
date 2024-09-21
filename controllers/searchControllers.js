const Video = require("../models/videoModel");
const User = require("../models/userModel");
const Playlist = require("../models/playlistModel");

const searchVideo = async (req, res) => {  
    const { content } = req.params;  // استخدم req.query بدلاً من req.body
    try {
      // استخدم تعبيرًا منتظمًا (Regular Expression) للبحث في العناوين بشكل غير حساس لحالة الأحرف
      let videos = await Video.find({ title: { $regex: content, $options: 'i' } }).populate('userId');
      videos=videos.map(video=>({
        id:video._id,
        videoUrl:video.videoUrl,
        backImgVideoUrl:video.backImgVideoUrl,
        title:video.title,
        views:video.views,
        userName:video.userId.userName,
      }))
      res.status(200).json(videos);  
    } catch (err) {
      res.status(500).json({ message: 'Error searching videos', error: err.message });
    }
}
const searchUsers = async (req, res) => {  
  const { content } = req.params;  // استخدم req.query بدلاً من req.body
  try {
    // استخدم تعبيرًا منتظمًا (Regular Expression) للبحث في العناوين بشكل غير حساس لحالة الأحرف
    let users = await User.find({ userName: { $regex: content, $options: 'i' } });
    users=users.map(user=>({
      userName:user.userName,
      id:user._id,
      profilePicture:user.profilePicture
    }))
    res.status(200).json(users);  // إرسال النتائج في صيغة JSON
  } catch (err) {
    res.status(500).json({ message: 'Error searching videos', error: err.message });
  }
}

const searchPlaylists = async (req, res) => {  
  const { content } = req.params;  

  try {
    // Use a regular expression to search for playlists by name, case insensitive
    const playlists = await Playlist.find({ name: { $regex: content, $options: 'i' } }).populate('userId');
    
    const playlistsWithFirstVideo = await Promise.all(playlists.map(async playlist => {
      // Populate the videosId field
      await playlist.populate('videosId');
      
      // Check if there are any videos in the playlist
      const videoImg = playlist.videosId.length > 0 ? playlist.videosId[0].backImgVideoUrl : null;

      // Return the relevant playlist information
      return {
        userId: playlist.userId._id,
        userName: playlist.userId.userName,
        profilePicture: playlist.userId.profilePicture,
        playlistId: playlist._id,
        namePlaylist: playlist.name,
        videoImg
      };
    }));

    res.status(200).json(playlistsWithFirstVideo); // Send the final result in JSON format
  } catch (err) {
    res.status(500).json({ message: 'Error searching playlists', error: err.message });
  }
}

module.exports = {
    searchVideo,
    searchUsers,
    searchPlaylists
};