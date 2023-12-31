// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import exploreSlice from "./exploreSlice";
import projectSlice from "./projectSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    explore: exploreSlice,
    project: projectSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
