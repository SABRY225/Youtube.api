const SavePlaylist = require('../models/savePlaylistModel');
const SaveVideo = require('../models/saveVideoModel');

const getSaveVideos = async (req, res) => {
    try {
        let savedVideos = await SaveVideo.find({ userId: req.userId }).populate('videoId').populate('userId');
        savedVideos=savedVideos.map(video=>({
            VideoId:video.videoId._id,
            backImgVideoUrl:video.videoId.backImgVideoUrl,
            title:video.videoId.title,
            views:video.videoId.views,
            userId:video.userId._id,
            userName:video.userId.userName,
            profilePicture:video.userId.profilePicture,
        }))
        res.status(200).json(savedVideos);
    } catch (error) {
        res.status(500).json({ message: error.message, success:false });
    }
};

const getSavePlaylists = async (req, res) => {
    try {
        // Fetch saved playlists and populate userId and playlistId
        const savedPlaylists = await SavePlaylist.find({ userId: req.userId })
            .populate('playlistId')
            .populate('userId');

        // Fetch the populated videosId field for each playlist in parallel
        const playlistsWithFirstVideo = await Promise.all(savedPlaylists.map(async playlist => {
            // Populate the videosId field
            await playlist.playlistId.populate('videosId');
            
            // If the playlist has videos, select the first one; otherwise, handle it gracefully
            const videoImg = playlist.playlistId.videosId?.length > 0 
                ? playlist.playlistId.videosId[0].backImgVideoUrl 
                : null;
            return {
                userId: playlist.userId._id,
                userName: playlist.userId.userName,
                profilePicture: playlist.userId.profilePicture,
                PlaylistId: playlist.playlistId._id,
                namePlaylist: playlist.playlistId.name,
                videoImg
            };
        }));

        res.status(200).json(playlistsWithFirstVideo);
    } catch (error) {
        console.error(error); // Log the actual error for debugging
        res.status(500).json({ message: 'Failed to fetch saved playlists', error: error.message });
    }
};



const savePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const checkSave= await SavePlaylist.findOne({playlistId,userId: req.userId});
        if (checkSave) {
            return res.status(400).json({ message: `PlaylistId has already Saved.`,success:false });
        }
        const newSavePlaylist = new SavePlaylist({
            userId: req.userId,
            playlistId: playlistId
        });
        await newSavePlaylist.save();
        return res.status(201).json({ message: 'Save playlist successfully', success:true  });
    } catch (error) {
        res.status(500).json({ message: error.message, success:false  });
    }
};

const deleteSavePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        await SavePlaylist.deleteOne({ userId: req.user.id, playlistId });
        return res.status(200).json({ message: 'Playlist removed from saved list',success:true });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete saved playlist', success:false });
    }
};

const saveVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const checkSave= await SaveVideo.findOne({videoId,userId: req.userId});
        if (checkSave) {
            return res.status(400).json({ message: `Video has already Saved.`,success:false });
        }
        const newSaveVideo = new SaveVideo({
            userId: req.userId,
            videoId
        });
        await newSaveVideo.save();
        return res.status(200).json({ message: 'Save video successfully', success:true  });
    } catch (error) {
        res.status(500).json({ message: error.message, success:false });
    }
};

const deleteSaveVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        await SaveVideo.deleteOne({ userId: req.user.id, videoId });
        res.status(200).json({ message: 'Video removed from saved list',success:true });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete saved video', success:false });
    }
};

const checkSaveVideo = async (req, res) => {
    try {
      const userId = req.userId; // Extract userId directly
      const { videoId } = req.params;
  
      // Search for existing saved videos by userId and videoId
      const existingSave = await SaveVideo.find({ userId, videoId });
  
      if (existingSave.length) {
        return res.status(200).json({ status: 'saved' });
      } else {
        return res.status(200).json({ status: 'unsaved' });
      }
    } catch (error) {
      console.error("Error checking saved video:", error); // Log the error for debugging
      return res.status(500).json({ message: error.message, success: false });
    }
  };

  const checkSavePlaylist = async (req, res) => {
    try {
      const userId = req.userId; // Extract userId directly
      const { playlistId } = req.params;
  
      // Search for existing saved videos by userId and playlistId
      const existingSave = await SavePlaylist.find({ userId, playlistId });
  
      if (existingSave.length) {
        return res.status(200).json({ status: 'saved' });
      } else {
        return res.status(200).json({ status: 'unsaved' });
      }
    } catch (error) {
      console.error("Error checking saved playlist:", error); // Log the error for debugging
      return res.status(500).json({ message: error.message, success: false });
    }
  };
module.exports = {
    deleteSaveVideo,
    saveVideo,
    deleteSavePlaylist,
    savePlaylist,
    getSavePlaylists,
    getSaveVideos,
    checkSaveVideo,
    checkSavePlaylist
}