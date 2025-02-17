import { deleteVideo, uploadVideo } from "../controllers/videoController.js";
import { uploadVideoAndThumbnail } from "../middleware/upload.js";

export default function videoRoutes(app) {
    app.post("/upload-video", uploadVideoAndThumbnail, uploadVideo);
    app.delete("/delete-video/:videoId", deleteVideo);
}