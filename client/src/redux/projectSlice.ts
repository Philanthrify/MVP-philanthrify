import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Project } from "@/models/project";
import axios from "axios";

// Define a type for the slice state
interface ProjectState {
  project: Project | null;
  loading: boolean;
  error: string | null;
}
// Define the initial state using that type
const initialState: ProjectState = {
  project: null,
  loading: false,
  error: null,
};

// Create the thunk for fetching project data
export const fetchProject = createAsyncThunk<
  Project, // Return type of the payload creator
  string, // First argument to the payload creator
  { state: RootState } // Types for ThunkAPI
>("project/fetchProject", async (projectId, { getState, rejectWithValue }) => {
  try {
    const response = await axios.get<Project>(
      `http://localhost:1337/project/${projectId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // Reducers for other actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.loading = false;
          state.project = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.project = null;
      });
  },
});

// Export the reducer as default
export default projectSlice.reducer;
