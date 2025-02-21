import { getUserProfile, loginUser, registerUser, updateProfile } from "../controllers/authController.js"
import { uploadUserAvatar } from "../middleware/upload.js";

export default function authRoutes(app) {
    app.post("/register", registerUser);
    app.post("/login", loginUser);

    app.get("/user/:userId", getUserProfile);
    app.put("/user/update-profile/:userId", uploadUserAvatar, updateProfile);
} 