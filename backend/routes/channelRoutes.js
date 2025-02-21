import { createChannel, getChannel, subscribeChannel, updateChannel } from "../controllers/channelController.js"
import { uploadChannelAvatar } from "../middleware/upload.js";

export default function channelRoutes(app) {
    app.post("/create-channel", uploadChannelAvatar, createChannel);
    app.get("/channel/:channelId", getChannel);
    app.put("/channel/update-channel/:channelId", uploadChannelAvatar, updateChannel);
    app.post("/channel/subscribe/:channelId", subscribeChannel);
}