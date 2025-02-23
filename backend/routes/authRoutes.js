import { getUserProfile, loginUser, registerUser, updateProfile } from "../controllers/authController.js"
import { uploadUserAvatar } from "../middleware/upload.js";

export default function authRoutes(app) {
    app.post("/api/user/register", registerUser);
    app.post("/api/user/login", loginUser);

    app.get("/api/user/:userId", getUserProfile);
    app.put("/api/user/update-profile/:userId", uploadUserAvatar, updateProfile);
} 