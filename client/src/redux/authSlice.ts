// authSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Charity, CharityMembership } from "@/models/charity";
import Cookies from "universal-cookie";

// Define a type for the slice state
interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  firstname: string | null;
  email: string | null;
  userType: string | null;
  charity: Charity | null;
  // ATTENTION: charity is a for which they are a member of and are logged in as
  // for now assuming only one membership a user.
  charities: CharityMembership[] | null;
  // ATTENTION: only for project leads and project workers/reporters.
  // This is a list of projects for which this user has access.
  // for charity leads the list could be quite long since they have admin rights for
  // all projects in charity therefore this will be fleshed out later.
  projects: any[] | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  firstname: null,
  email: null,
  userType: null,
  charity: null,
  charities: null, // if not charity user/no charity then it's going to be either null or empty string, same with projects
  projects: null,
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

    // Action to logout
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.firstname = null;
      state.email = null;
      state.userType = null;
      state.charity = null;
      state.charities = null;
      state.projects = null;
      // TODO: unset the cookie as well
      const cookies = new Cookies();
      cookies.remove("jwt_authorisation", { path: "/" });
    },
    // This action can be used to set the login state and token at the same time
    login: (
      state,
      action: PayloadAction<{
        token: string | null;
        firstname: string | null;
        email: string | null;
        userType: string | null;
        charity?: Charity | null;
        charities?: CharityMembership[] | null;
        projects?: any[] | null;
      }>
    ) => {
      const {
        token,
        firstname,
        email,
        userType,
        charity,
        charities,
        projects,
      } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.firstname = firstname;
      state.email = email;
      state.userType = userType;
      if (charity) {
        state.charity = charity;
      }
      if (charities) {
        state.charities = charities;
      }
      if (projects) {
        state.projects = projects;
      }
    },
  },
});

export const { setToken, logout, login, setLoginState } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
