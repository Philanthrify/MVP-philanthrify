// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import exploreSlice from "./exploreSlice";
import projectSlice from "./projectSlice";
import navbarSlice from "./navbarSlice";
import charitySlice from "./charitySlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    explore: exploreSlice,
    project: projectSlice,
    navbar: navbarSlice,
    charity: charitySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
