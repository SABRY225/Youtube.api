const Like = require('../models/likeModel');

// Create a new like/dislike for a video
const createLike = async (req, res) => {
  try {
    const userId=req.userId
    const { Type, videoId } = req.body;

    // Check if the user has already liked/disliked the video
    const existingLike = await Like.findOne({ userId, videoId });
    if (existingLike) {
      return res.status(400).json({ message: `User has already ${existingLike.Type} this video.`,success:false });
    }

    // Create a new Like instance
    const newLike = new Like({ Type, userId, videoId });

    // Save to the database
    await newLike.save();

    res.status(201).json({ message: `add ${Type} this video.`,success:true });
  } catch (error) {
    res.status(500).json({ message: error.message,success:true });
  }
};

// Get all likes/dislikes for a specific video
const getLikes = async (req, res) => {
  try {
    const { videoId } = req.params;
    // Find all likes/dislikes for the specific video
    const countLike=await Like.find({ videoId }).countDocuments({Type:'Like'})
    const countDisLike=await Like.find({ videoId }).countDocuments({Type:'DisLike'})
    return res.status(200).json({countLike,countDisLike});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a like/dislike by ID
const deleteLike = async (req, res) => {
  try {
    const userId=req.userId
    const { id } = req.params;

    // Find and delete the Like by ID
    const deletedLike = await Like.findOneAndDelete({videoId:id,userId});

    if (!deletedLike) {
      return res.status(404).json({ message: 'Like not found',success:false  });
    }

    res.status(200).json({ message: 'Like deleted successfully' ,success:true });
  } catch (error) {
    res.status(500).json({ message: error.message ,success:false  });
  }
};

const checkLike =async (req,res)=>{
  try {
    const userId=req.userId
    const { videoId } = req.params;
    const existingLike = await Like.findOne({ userId, videoId });
    if (existingLike) {
      return res.status(200).json({Type:existingLike.Type});
    }else{
      return res.status(200).json({Type:'NoLike'});
    }
  } catch (error) {
     res.status(500).json({ message: error.message ,success:false });
  }
}

module.exports = {
  createLike,
  getLikes,
  deleteLike,
  checkLike
};
