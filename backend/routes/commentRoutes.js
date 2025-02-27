import { createComment, deleteCommentById, getCommentsByVideo } from "../controllers/commentController.js";

export default function commentRoutes(app) {
    app.post("/api/comments/add", createComment);
    app.get("/api/comments/:videoId", getCommentsByVideo);
    app.delete("/delete-comment/:commentId", deleteCommentById);
}