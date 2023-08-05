import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./locationSlice";
import searchEngineSlice from "./searchEngineSlice";
import uiSlice from "./uiSlice";
import weatherDataSlice from "./weatherDataSlice";

const store = configureStore({
  reducer: {
    weatherData: weatherDataSlice,
    location: locationSlice,
    ui: uiSlice,
    searchEngine: searchEngineSlice,
  },
});

export default store;
