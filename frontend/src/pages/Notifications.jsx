import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markNotificationRead, markNotificationUnread } from "../store/slices/notificationSlice";
import ViewNotificationModal from "../components/ViewNotificationModal";
import axios from "axios";
import { toast } from "react-toastify";

function Notifications() {
    const dispatch = useDispatch();
    const { notifications, loading } = useSelector((state) => state.notifications);
    const { data: userData } = useSelector(state => state.auth.user);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const handleReadNotification = async (id) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/read-notification/${id}`, {
                userId: userData._id
            })
            toast.success(response?.data?.message)
            dispatch(markNotificationRead(id));
        } catch (err) {
            console.log(err);
        }
    }

    const handleUnreadNotification = async (id) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/unread-notification/${id}`, {
                userId: userData._id
            })
            toast.success(response?.data?.message)
            dispatch(markNotificationUnread(id));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="px-4 py-1 w-full h-[calc(100vh-57px)] overflow-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
                <span className="text-sm text-gray-500">
                    {notifications?.filter((n) => !n.isRead).length} {notifications.length === 1 ? "unread alert" : "unread alerts"}
                </span>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
            ) : notifications?.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500 text-lg">No notifications yet</p>
                    <p className="text-gray-400 text-sm mt-2">You're all caught up!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications?.map((notif) => (
                        <div
                            key={notif.notificationId._id}
                            onClick={() => setSelectedNotification(notif)}
                            className={`p-4 cursor-pointer border rounded-lg shadow-sm flex justify-between items-center transition-all duration-200 ${notif.isRead
                                ? "bg-gray-50 hover:bg-gray-100 font-semibold border-red-100"
                                : "bg-white hover:bg-red-50 font-semibold border-red-200"
                                }`}
                        >
                            <div className="flex items-center space-x-4">
                                <div className={`w-2 h-2 rounded-full ${notif.isRead ? "bg-gray-300" : "bg-red-500"
                                    }`}></div>
                                <div>
                                    <p className="text-gray-800">{notif.notificationId.message}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        <span className="text-gray-700">Title: </span>{notif.notificationId.description}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(notif.notificationId.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <button className="text-sm cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    notif.isRead ? handleUnreadNotification(notif.notificationId._id) : handleReadNotification(notif.notificationId._id)
                                }}
                            >
                                {notif.isRead ? <span className="text-gray-600 hover:underline">Mark unread</span> : <span className="text-red-600 hover:underline">Mark read</span>}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <ViewNotificationModal
                isOpen={selectedNotification}
                onClose={() => setSelectedNotification(null)}
                notification={selectedNotification}
            />
        </div>
    );
}

export default Notifications;