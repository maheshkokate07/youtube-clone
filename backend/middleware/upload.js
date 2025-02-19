import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const videoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "youtube-clone/videos",
        resource_type: "video",
        format: "mp4"
    }
});

const thumbnailStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "youtube-clone/thumbnails",
        resource_type: "image",
        allowedFormats: ["jpg", "jpeg", "png"]
    }
});

const channelAvatarStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "youtube-clone/channelAvatar",
        resource_type: "image",
        allowedFormats: ["jpg", "jpeg", "png"]
    }
})

const customStorage = {
    _handleFile: function (req, file, cb) {
        let storage;
        if (file.fieldname === "video") {
            storage = videoStorage;
        } else if (file.fieldname === "thumbnail") {
            storage = thumbnailStorage;
        } else {
            return cb(new Error("Unexpected field"));
        }
        storage._handleFile(req, file, cb);
    }
};

// Create multer instance with custom storage
export const uploadVideoAndThumbnail = multer({
    storage: customStorage,
}).fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
]);

export const uploadChannelAvatar = multer({
    storage: channelAvatarStorage,
}).single("channelAvatar")