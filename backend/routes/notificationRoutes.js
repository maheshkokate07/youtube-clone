import { getNotifications, readNotification, unreadNotification } from "../controllers/notificationController.js";

export default function notificationRoutes(app) {
    app.get("/api/notifications/:userId", getNotifications);
    app.put("/api/read-notification/:notificationId", readNotification);
    app.put("/api/unread-notification/:notificationId", unreadNotification);
}