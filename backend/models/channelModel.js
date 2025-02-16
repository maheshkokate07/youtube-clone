import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    channelName: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String
    },
    channelBanner: {
        type: String
    },
    subscribers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }]
})

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;