import { deleteVideo, dislikeVideo, getAllVideos, getChannelVideos, getVideoById, likeVideo, searchVideo, uploadVideo } from "../controllers/videoController.js";
import { uploadVideoAndThumbnail } from "../middleware/upload.js";

export default function videoRoutes(app) {
    app.post("/upload-video", uploadVideoAndThumbnail, uploadVideo);
    app.delete("/delete-video/:videoId", deleteVideo);
    app.get("/api/videos", getAllVideos);
    app.get("/videos/:videoId", getVideoById);

    app.post("/like-video/:videoId", likeVideo);
    app.post("/dislike-video/:videoId", dislikeVideo);

    app.get("/channel/videos/:channelId", getChannelVideos);
    app.get("/videos/search", searchVideo)
}