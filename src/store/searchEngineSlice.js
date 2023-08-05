import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchEngine: [],
};

const searchEngineSlice = createSlice({
  name: "searchEngine",
  initialState,
  reducers: {
    setSearchEngine: (state, action) => {
      state.searchEngine = action.payload;
    },
  },
});

export const { setSearchEngine } = searchEngineSlice.actions;

export default searchEngineSlice.reducer;
