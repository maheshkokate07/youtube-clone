import Comment from "../models/commentModel.js";
import Video from "../models/videoModel.js";

export const createComment = async (req, res) => {
    try {
        const { videoId, userId, text } = req.body;

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        const newComment = new Comment({
            text,
            videoId,
            userId,
        })
        await newComment.save();

        video.comments.push(newComment._id);
        await video.save();

        res.status(200).json({ message: "Comment added", comment: newComment });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

export const getCommentsByVideo = async (req, res) => {
    try {
        const { videoId } = req.params;

        const video = await Video.findById(videoId).populate({
            path: "comments",
            options: { sort: { timestamp: -1 } },
            populate: { path: "userId", select: "userName userAvatar" }
        })

        if (!video) {
            return res.status(404).json({ message: "No video found" });
        }

        res.status(200).json({ success: true, message: "Comments fetched successfully", data: video.comments });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        await Video.findByIdAndUpdate(deletedComment.videoId, {
            $pull: { comments: commentId }
        });

        res.status(200).json({ message: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}