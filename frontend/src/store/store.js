import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { logout } from "./slices/authSlice";

const rootReducer = combineReducers({
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

export default store;