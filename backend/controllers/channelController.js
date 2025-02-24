import cloudinary from "../config/cloudinary.js";
import Channel from "../models/channelModel.js";
import User from "../models/UserModel.js";

export const createChannel = async (req, res) => {
    try {
        const { userId, channelName, description } = req.body;

        let avatarUrl = ""

        if (req.file) {
            avatarUrl = req.file.path;
        }

        const user = await User.findById(userId);
        if (user.channel) {
            return res.status(400).json({ message: "User already has a channel" });
        }

        const newChannel = new Channel({
            channelName,
            owner: userId,
            description,
            avatarUrl
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

export const subscribeChannel = async (req, res) => {
    try {

        const { channelId } = req.params;
        const { userId } = req.body;

        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: "Channel not found" })
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (channel.subscribers.includes(userId)) {
            await Channel.findByIdAndUpdate(channelId, { $pull: { subscribers: userId } });
            await User.findByIdAndUpdate(userId, { $pull: { subscribedChannels: channelId } });

            return res.status(200).json({ message: "Channel unsubscribed" })
        } else {
            await Channel.findByIdAndUpdate(channelId, { $addToSet: { subscribers: userId } });
            await User.findByIdAndUpdate(userId, { $addToSet: { subscribedChannels: channelId } });

            return res.status(200).json({ message: "Channel subscribed" });
        }

    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

export const updateChannel = async (req, res) => {
    try {
        const { channelId } = req.params;
        const { channelName, description } = req.body;

        const channel = await Channel.findById(channelId);

        if (!channel) {
            return res.status(404).json({ message: "Channel not found" })
        }

        if (req.file) {
            if (channel.avatarUrl) {
                try {
                    const avatarPublicId = channel.avatarUrl.split("/").pop().split(".")[0];
                    await cloudinary.uploader.destroy(`youtube-clone/channelAvatar/${avatarPublicId}`, { resource_type: "image" })
                } catch (err) {
                    console.log(err.message);
                }
            }
            channel.avatarUrl = req.file.path;
        }

        if (channelName) {
            channel.channelName = channelName
        }

        if (description) {
            channel.description = description
        }

        await channel.save();

        res.status(200).json({ message: "Channel updated", channel });

    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

export const getChannel = async (req, res) => {
    try {
        const { channelId } = req.params;

        const channel = await Channel.findById(channelId);

        if (!channel) {
            return res.status(404).json({ message: "Channel not found" })
        }

        res.status(200).json({ message: "Channel info fetched", data: channel });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}