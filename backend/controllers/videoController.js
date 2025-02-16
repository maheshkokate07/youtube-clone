import Channel from "../models/channelModel.js";
import User from "../models/UserModel.js";
import Video from "../models/videoModel.js";

export const uploadVideo = async (req, res) => {
    try {
        const { title, description, uploaderId, channelId } = req.body;

        const user = await User.findById(uploaderId);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: "Channel not found" })
        }

        const videoFile = req.files["video"][0];

        if (!videoFile) {
            return res.status(400).json({ message: "No video file provided" })
        }

        const videoUrl = videoFile.path;
        const thumbnailUrl = req.files["thumbnail"] ? req.files["thumbnail"][0].path : videoUrl.replace("/upload/", "/upload/w_300,h_200,so_1/f_jpg/");

        const newVideo = new Video({
            title,
            description,
            videoUrl,
            thumbnailUrl,
            uploader: uploaderId,
            channelId
        });

        await newVideo.save();

        user.uplodedVideos.push(newVideo._id);
        await user.save();

        channel.videos.push(newVideo._id);
        await channel.save();

        res.status(200).json({ message: "Video uploaded successfully", video: newVideo })
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}