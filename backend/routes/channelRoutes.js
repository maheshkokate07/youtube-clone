import { createChannel, getChannelVideos } from "../controllers/channelController.js"

export default function channelRoutes(app) {
    app.post("/create-channel", createChannel);
    app.get("/channel/:channelId", getChannelVideos);
}