// authSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  selected: string; // the tab which is selected
}

// Define the initial state using that type
const initialState: AuthState = {
  selected: "explore",
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    // Action to login
    setSelected: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
  },
});

export const { setSelected } = navbarSlice.actions;

export default navbarSlice.reducer;
