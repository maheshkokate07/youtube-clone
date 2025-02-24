import { createComment, deleteCommentById, getCommentsByVideo } from "../controllers/commentController.js";

export default function commentRoutes(app) {
    app.post("/add-comment", createComment);
    app.get("/comments/:videoId", getCommentsByVideo);
    app.delete("/delete-comment/:commentId", deleteCommentById);
}