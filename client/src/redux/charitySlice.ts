import {
  CharityPagePayload,
  CharityPageUpdatePayload,
  UpdateCharityFieldPayload,
} from "@/models/charity";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CharityState {
  charity: CharityPagePayload | null;
}
// Define the initial state using that type
const initialState: CharityState = {
  charity: null,
};

export const charitySlice = createSlice({
  name: "charity",
  initialState,
  reducers: {
    setCharity: (state, action: PayloadAction<CharityPagePayload>) => {
      state.charity = action.payload;
    },

    // only for textfields
    updateCharityField: (
      state,
      action: PayloadAction<UpdateCharityFieldPayload>
    ) => {
      const { field, value } = action.payload;
      if (state.charity) {
        state.charity[field] = value;
      }
    },

    // New reducer for handling CharityPageUpdatePayload
    updateSidebarCharityPage: (
      state,
      action: PayloadAction<CharityPageUpdatePayload>
    ) => {
      const { tags, countriesActive } = action.payload;
      if (state.charity) {
        // Assuming you want to replace the existing arrays wholly
        state.charity.tags = tags;
        state.charity.countriesActive = countriesActive;
      }
    },
  },
});
export const { setCharity, updateCharityField, updateSidebarCharityPage } =
  charitySlice.actions;

// Export the reducer as default
export default charitySlice.reducer;
