import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "youtube-root",
    storage
}

const rootReducer = combineReducers({
    auth: authReducer
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