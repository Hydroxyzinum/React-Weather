import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  futureData: [],
  time: {},
};

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setFutureData: (state, action) => {
      state.futureData = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { setData, setFutureData, setTime } = weatherDataSlice.actions;

export default weatherDataSlice.reducer;
