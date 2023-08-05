import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  stateInterval: 0,
  theme: {},
  rightMenu: "",
  forecastTime: 9,
  unit: "metric",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setStateInterval: (state) => {
      state.stateInterval += 1;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setRightMenu: (state, action) => {
      state.rightMenu = action.payload;
    },
    setForecastTime: (state, action) => {
      state.forecastTime = action.payload;
    },
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
  },
});

export const {
  setCount,
  setStateInterval,
  setTheme,
  setRightMenu,
  setForecastTime,
  setUnit,
} = uiSlice.actions;

export default uiSlice.reducer;
