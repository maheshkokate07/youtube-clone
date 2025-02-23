import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { decodeToken } from "../../../utils/decodeJwt.js";

export const loginUser = createAsyncThunk(
    "auth/loginUser",

    async (credentials, { rejectWithValue }) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, credentials, config);
            const { token } = response.data;

            if (!token) return rejectWithValue("Invalid token received from server");

            const decodedToken = decodeToken(token);

            if (decodedToken) {
                localStorage.setItem("token", token);

                return {
                    token,
                    decodedToken
                }
            }

            return rejectWithValue("Invalid token");
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Login failed")
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {
            token: null,
            data: null,
            isAuthenticated: false,
        },
        loading: false,
        error: null
    },

    reducers: {
        logout: (state) => {
            state.user.isAuthenticated = false;
            state.user.token = null;
            state.user.data = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("token");
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const {token, decodedToken} = action.payload;
                if (token) localStorage.setItem("token", token);
                state.user.token = token;
                state.user.data = decodedToken;
                state.user.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user.isAuthenticated = false;
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;