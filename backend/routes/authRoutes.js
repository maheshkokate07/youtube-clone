import { loginUser, registerUser } from "../controllers/authController.js"

export default function authRoutes(app) {
    app.post("/register", registerUser);
    app.post("/login", loginUser);
} 