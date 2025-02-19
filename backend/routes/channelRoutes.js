import { createChannel, getChannel } from "../controllers/channelController.js"
import { uploadChannelAvatar } from "../middleware/upload.js";

export default function channelRoutes(app) {
    app.post("/create-channel", uploadChannelAvatar, createChannel);
    app.get("/channel/:channelId", getChannel);
}