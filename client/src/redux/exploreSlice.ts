// authSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchFilters } from "@/models/searchFilters";
import { Project } from "@/models/project";

// Define a type for the slice state
interface ExploreState {
  searchTerm: string | null;
  filters: SearchFilters;
  searchResults: Project[] | null;
  page: number;
}

// Define the initial state using that type
const initialState: ExploreState = {
  searchTerm: null,
  filters: { country: "", listOfTags: [] },
  searchResults: null,
  page: 1,
};

export const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFilters: (state, action: PayloadAction<SearchFilters>) => {
      state.filters = action.payload;
    },
    deleteFilterTag: (state, action: PayloadAction<string>) => {
      state.filters.listOfTags = state.filters.listOfTags.filter(
        (tag) => tag !== action.payload
      );
    },
    clearFilterCountry: (state) => {
      state.filters.country = "";
    },
    setSearchResults: (state, action: PayloadAction<Project[]>) => {
      state.searchResults = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setFilters,
  deleteFilterTag,
  clearFilterCountry,
  setSearchResults,
  setPage,
} = exploreSlice.actions;

export default exploreSlice.reducer;
