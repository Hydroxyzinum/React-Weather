import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  fullLocation: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setFullLocation: (state, action) => {
      state.fullLocation = action.payload;
    },
  },
});

export const { setLocation, setFullLocation } = locationSlice.actions;

export default locationSlice.reducer;
