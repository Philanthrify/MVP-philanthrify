import {
  CharityPagePayload,
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

    // only for textfields
    updateSidebarCharityPage: (
      state,
      action: PayloadAction<UpdateCharityFieldPayload>
    ) => {
      const { field, value } = action.payload;
      if (state.charity) {
        state.charity[field] = value;
      }
    },
  },
});
export const { setCharity, updateCharityField } = charitySlice.actions;

// Export the reducer as default
export default charitySlice.reducer;
