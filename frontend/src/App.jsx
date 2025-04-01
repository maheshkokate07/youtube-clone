import { useDispatch, useSelector } from 'react-redux';
import { decodeToken } from '../utils/decodeJwt.js';
import './App.css'
import AppRoutes from './routes/index.jsx';
import { useEffect } from 'react';
import { logout } from './store/slices/authSlice.js';
import socket from '../utils/socket.js';
import { addNewNotification, resetNotifications } from './store/slices/notificationSlice.js';

import notificationSound from "./assets/notification.wav";
import { toast } from 'react-toastify';

function App() {

  const { token, data: userData } = useSelector(state => state?.auth?.user);

  // Calculate current epoch time
  const epochTime = Math.floor(Date.now() / 1000);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      try {
        // Decode token
        const decodedToken = decodeToken(token);

        // If token expired then dispatch the logout slice and log out the user
        if (decodedToken.exp < epochTime) {
          dispatch(logout());
          dispatch(resetNotifications());
        }
      } catch (error) {
        dispatch(logout());
        dispatch(resetNotifications());
      }
    }
  }, []);

  useEffect(() => {
    // Send user ID to mark as online
    if (userData && userData?._id) {
      socket.emit("join", userData?._id);
    }

    // Listen for new notifications
    socket.on("newNotification", async (notification) => {
      dispatch(addNewNotification({
        notificationId: notification,
        isRead: false
      }))

      // Play notification sound only after user interaction
      const audio = new Audio(notificationSound);
      audio.play()

      toast.info(notification?.message);
    });

    return () => {
      socket.off("newNotification");
    };
  }, [userData]);

  useEffect(() => {
    return () => {
      if (userData) {
        socket.emit("leave", userData._id);
      }
      socket.disconnect();
    };
  }, []);

  return <AppRoutes />
}

export default App;