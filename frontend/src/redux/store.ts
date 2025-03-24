import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // LocalStorage by default
import { combineReducers } from "redux"; // Import combineReducers
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";

// Persist config to persist everything
const persistConfig = {
  key: "root",
  storage, // Use localStorage
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  posts: postReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer here
});

const persistor = persistStore(store); // Persist the store

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
