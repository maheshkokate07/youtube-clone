import { createChannel } from "../controllers/channelController.js"

export default function channelRoutes(app) {
    app.post("/create-channel", createChannel)
}