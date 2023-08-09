import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "../slices/locationSlice";
import searchEngineSlice from "../slices/searchEngineSlice";
import uiSlice from "../slices/uiSlice";
import weatherDataSlice from "../slices/weatherDataSlice";

const store = configureStore({
  reducer: {
    weatherData: weatherDataSlice,
    location: locationSlice,
    ui: uiSlice,
    searchEngine: searchEngineSlice,
  },
});

export default store;
