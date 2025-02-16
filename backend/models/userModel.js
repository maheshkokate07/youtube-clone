import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId, ref: "Channel"
    },
    uplodedVideos: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Video"
    }]
})

const User = mongoose.model("User", userSchema);

export default User;