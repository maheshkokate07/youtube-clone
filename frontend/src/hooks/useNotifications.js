import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewNotification } from "../store/slices/notificationSlice.js";
import { toast } from "react-toastify";
import notificationSound from "../assets/notification.wav";
import socket from "../../utils/socket.js";

export const useNotifications = () => {
    const dispatch = useDispatch();
    const { data: userData } = useSelector((state) => state?.auth?.user);

    useEffect(() => {
        if (userData?._id) {
            socket.emit("join", userData._id);

            socket.on("newNotification", (notification) => {
                dispatch(addNewNotification({ notificationId: notification, isRead: false }));

                const audio = new Audio(notificationSound);
                audio.play().then(() => {
                    toast.info("New notification received");
                }).catch((error) => console.error("Audio play failed", error));
            });
        }

        return () => {
            if (userData?._id) {
                socket.emit("leave", userData._id);
            }
            socket.disconnect();
        };
    }, [userData]);
};
