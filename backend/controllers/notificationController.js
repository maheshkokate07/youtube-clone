import User from "../models/userModel.js";

export const getNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate({
            path: "notifications.notificationId"
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            notifications: user.notifications.reverse()
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

export const readNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const { userId } = req.body;

        const user = await User.findOneAndUpdate(
            { _id: userId, "notifications.notificationId": notificationId },
            { $set: { "notifications.$.isRead": true } },
        );

        if (!user) {
            return res.status(404).json({ message: "Notification not found for this user" });
        }

        res.status(200).json({
            message: "Notification marked as read",
        });

    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

export const unreadNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const { userId } = req.body;

        const user = await User.findOneAndUpdate(
            { _id: userId, "notifications.notificationId": notificationId },
            { $set: { "notifications.$.isRead": false } },
        );

        if (!user) {
            return res.status(404).json({ message: "Notification not found for this user" });
        }

        res.status(200).json({
            message: "Notification marked as unread",
        });

    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};