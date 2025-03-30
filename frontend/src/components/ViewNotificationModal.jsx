import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { markNotificationRead } from "../store/slices/notificationSlice";

function ViewNotificationModal({ isOpen, onClose, notification }) {

    if (!isOpen || !notification) return null;
    const { data: userData } = useSelector(state => state.auth.user);

    console.log(notification)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleReadNotification = async (id) => {
        try {
            const response = axios.put(`${import.meta.env.VITE_API_URL}/api/read-notification/${id}`, {
                userId: userData._id
            })
            dispatch(markNotificationRead(id));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (isOpen && notification) {
            handleReadNotification(notification.notificationId._id)
        }
    }, [isOpen, notification])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs"
            onClick={onClose}
        >
            <div
                className="bg-white w-[400px] p-6 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                        {notification.notificationId?.message}
                    </h2>

                    <div className="space-y-4">
                        <p className="text-gray-600">
                            <span className="text-gray-700">Title: </span>{notification.notificationId.description}
                        </p>

                        <p className="text-sm text-gray-400">
                            Received: {new Date(notification.notificationId.createdAt).toLocaleString()}
                        </p>

                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${notification.isRead ? "bg-gray-300" : "bg-red-500"}`}></span>
                            <span className="text-sm text-gray-500">
                                {notification.isRead ? "Read" : "Unread"}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Close
                        </button>
                        <button
                            className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            onClick={() => {
                                navigate(`/watch/${notification.notificationId.videoId}`)
                                onClose();
                            }}
                        >
                            View Video
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewNotificationModal;