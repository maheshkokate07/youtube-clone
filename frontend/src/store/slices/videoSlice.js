import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVideos = createAsyncThunk(
    "videos/fetchVideos",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/videos`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch videos");
        }
    }
);

const videoSlice = createSlice({
    name: "videos",
    initialState: {
        videos: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.videos = action.payload;
                state.loading = false;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export default videoSlice.reducer;