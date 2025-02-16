import Channel from "../models/channelModel.js";
import User from "../models/UserModel.js";

export const createChannel = async (req, res) => {
    try {
        const { userId, channelName, description } = req.body;

        const user = await User.findById(userId);
        if (user.channel) {
            return res.status(400).json({ message: "User already has a channel" });
        }

        const newChannel = new Channel({
            channelName,
            owner: userId,
            description
        })

        await newChannel.save();

        user.channel = newChannel._id;
        await user.save();

        res.status(201).json({
            message: "Channel created",
            channel: newChannel
        })
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}