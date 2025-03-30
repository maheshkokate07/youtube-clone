import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotifications = createAsyncThunk(
    "notification/getNotifications",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notifications/${userId}`);
            return response.data.notifications;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch notifications");
        }
    }
);

const notificationSlice = createSlice({
    name: "notifications",

    initialState: {
        notifications: [],
        loading: false,
        error: null
    },
    reducers: {
        resetNotifications: (state) => {
            state.notifications = { notifications: null }
        },
        markNotificationRead: (state, action) => {
            const notification = state.notifications.find(n => n.notificationId._id === action.payload);
            if (notification) notification.isRead = true;
        },
        markNotificationUnread: (state, action) => {
            const notification = state.notifications.find(n => n.notificationId._id === action.payload);
            if (notification) notification.isRead = false;
        },
        addNewNotification: (state, action) => {
            state.notifications.unshift(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload;
                state.loading = false;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
})

export const { resetNotifications, markNotificationRead, markNotificationUnread, addNewNotification } = notificationSlice.actions;
export default notificationSlice.reducer;