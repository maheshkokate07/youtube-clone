import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import videoReducer from "./slices/videoSlice"
import notificationReducer from "./slices/notificationSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// config persist root to persist to persist our store after reload
const persistConfig = {
    key: "youtube-root",
    storage
}

const rootReducer = combineReducers({
    auth: authReducer,
    videos: videoReducer,
    notifications: notificationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store);
export default store;