import { useDispatch, useSelector } from 'react-redux';
import { decodeToken } from '../utils/decodeJwt.js';
import './App.css'
import AppRoutes from './routes/index.jsx';
import { useEffect, useState } from 'react';
import { logout } from './store/slices/authSlice.js';
import socket from '../utils/socket.js';
import { addNewNotification } from './store/slices/notificationSlice.js';

function App() {

  const { token, data: userData } = useSelector(state => state?.auth?.user);

  const [notifications, setNotifications] = useState([]);

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
        }
      } catch (error) {
        dispatch(logout());
      }
    }
  }, []);

  useEffect(() => {
    // Send user ID to mark as online
    if (userData && userData?._id) {
      socket.emit("join", userData?._id);
    }

    // Listen for new notifications
    socket.on("newNotification", (notification) => {
      dispatch(addNewNotification({
        notificationId: notification,
        isRead: false
      }))
    });

    return () => {
      socket.off("newNotification");
    };
  }, [userData]);

  useEffect(() => {
    return () => {
      if (userData) {
        socket.on("leave", userData._id);
      }
      socket.disconnect();
    };
  }, []);

  return <AppRoutes />
}

export default App;