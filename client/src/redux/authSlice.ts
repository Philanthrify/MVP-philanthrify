// authSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  username: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  username: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to login
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    // Action to set the token
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    // Action to set the token
    setUsername: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload;
    },
    // Action to logout
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.username = null;
    },
    // This action can be used to set the login state and token at the same time
    login: (
      state,
      action: PayloadAction<{ token: string | null; username: string | null }>
    ) => {
      const { token, username } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.username = username;
      console.log(state.isLoggedIn);
      console.log(state.token);
    },
  },
});

export const { setToken, logout, login, setLoginState } = authSlice.actions;

export default authSlice.reducer;
