const Playlist = require('../models/playlistModel');
const Video = require('../models/videoModel');

// Get all playlists [ name  id ]
const getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({userId:req.userId});
        res.status(200).json(playlists.map(playlist => ({
            id: playlist._id,
            name: playlist.name
        })));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlists', error });
    }
};

// Get all playlists [ name  id imgVideoOne]
const getPlaylistsByImgVideo = async (req, res) => {
    try {
        // Fetch playlists and populate the videos
        const playlists = await Playlist.find({userId:req.params.userId})
            .populate({
                path: 'videosId',   // populate the videos
                options: { limit: 1 } // fetch only the first video (imgVideoOne)
            })
            .select('name _id videosId'); // Select only the necessary fields

        // Transform the result to include only the first video's image
        const playlistsWithImg = playlists.map(playlist => ({
            name: playlist.name,
            id: playlist._id,
            imgVideoOne: playlist.videosId.length > 0 ?playlist.videosId[0].backImgVideoUrl : null
        }));

        return res.status(200).json(playlistsWithImg);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};


// Get a specific playlist by ID
const getPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    try {
        const playlist = await Playlist.findById(playlistId).populate('videosId').populate('userId');
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json({
            id:playlist._id,
            name:playlist.name,
            videos:playlist.videosId.map(video =>({
                id:video._id,
                views:video.views,
                backImgVideoUrl:video.backImgVideoUrl,
                title:video.title
            })),
             nameUser:playlist.userId.userName,
             profilePicture:playlist.userId.profilePicture,
        });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlist', error });
    }
};

// Create a new playlist
const createPlaylist = async (req, res) => {
    const userId = req.userId
    const { name } = req.body;
    try {
        const newPlaylist = new Playlist({ name,userId });
        await newPlaylist.save();
        res.status(201).json({ message: 'creating playlist successfully',success: true  });
    } catch (error) {
        res.status(400).json({ message: 'Error creating playlist',success: false });
    }
};

// Update a playlist by ID
const updatePlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { name, videosId } = req.body;
    try {
        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            playlistId,
            { name, videosId },
            { new: true }
        );
        if (!updatedPlaylist) {
            return res.status(404).json({ message: 'Playlist not found',success: false  });
        }
        res.status(200).json({ message: 'Playlist updating successfully' ,success: true  });
    } catch (error) {
        res.status(400).json({ message: 'Error updating playlist' ,success: false  });
    }
};

// Delete a playlist by ID
const deletePlaylist = async (req, res) => {
    const { playlistId } = req.params;
    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);
        if (!deletedPlaylist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting playlist', error });
    }
};

module.exports = {
    getPlaylists,
    getPlaylist,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    getPlaylistsByImgVideo
};
