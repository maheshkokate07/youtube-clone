import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"]
    }
});

// Store online users: { userId: socketId }
const onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", (userId) => {
        if (userId) {
            onlineUsers.set(userId, socket.id);
            console.log(`User ${userId} is online.`);
        }
    });

    socket.on("leave", (userId) => {
        if (userId) {
            onlineUsers.delete(userId);
            console.log(`User ${userId} has left.`);
        }
    });

    socket.on("disconnect", () => {
        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                console.log(`User ${userId} disconnected.`);
                break;
            }
        }
    });
});

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("MongoDB connection error: ", err));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Youtube Clone Server Running..." });
});

// Routes
authRoutes(app);
channelRoutes(app);
videoRoutes(app);
commentRoutes(app);
notificationRoutes(app);

// Start Server
httpServer.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));

export { io, onlineUsers };