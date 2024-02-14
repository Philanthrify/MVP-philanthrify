import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Project, UpdateProjectFieldPayload } from "@/models/project";
import axios from "axios";
import { User } from "@/models/User";
import { useSelector } from "react-redux";

// Define a type for the slice state
interface ProjectState {
  project: Project | null;
  loading: boolean;
  error: string | null;
  teammates: User[];
  charityTeammates: User[];
}
// Define the initial state using that type
const initialState: ProjectState = {
  project: null,
  loading: false,
  error: null,
  teammates: [],
  charityTeammates: [],
};

// Create the thunk for fetching project data
export const fetchProject = createAsyncThunk<
  Project, // Return type of the payload creator
  string, // First argument to the payload creator
  { state: RootState } // Types for ThunkAPI
>("project/fetchProject", async (projectId, thunkAPI) => {
  // TODO: need to get this from cookie
  const token = thunkAPI.getState().auth.token;
  // Construct headers conditionally based on the being of the token
  var headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = token;
  }

  try {
    const response = await axios.get<Project>(
      `${import.meta.env.VITE_API_URL}/project/${projectId}`,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // Reducers for other actions
    setTeammates: (state, action: PayloadAction<User[]>) => {
      state.teammates = action.payload;
    },
    setCharityTeammates: (state, action: PayloadAction<User[]>) => {
      state.charityTeammates = action.payload;
    },
    // only for predefined fields
    updateProjectField: (
      state,
      action: PayloadAction<UpdateProjectFieldPayload>
    ) => {
      const { field, value } = action.payload;
      if (state.project) {
        state.project[field] = value;
      }
    },
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

export const { setTeammates, setCharityTeammates, updateProjectField } =
  projectSlice.actions;

// Export the reducer as default
export default projectSlice.reducer;
