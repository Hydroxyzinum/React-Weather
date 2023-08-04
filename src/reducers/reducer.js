const initialState = {
  count: 0,
  stateInterval: 0,
  data: [],
  futureData: [],
  location: "",
  theme: {},
  fullLocation: "",
  searchEngine: [],
  rightMenu: "",
  forecastTime: 9,
  time: {},
  unit: "metric",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA_AND_FUTURE_DATA":
      return {
        ...state,
        data: action.payload.data,
        futureData: action.payload.futureData,
      };
    case "SET_FULL_DATA":
      return {
        ...state,
        fullLocation: action.payload.fullLocation,
        unit: action.payload.unit,
        rightMenu: action.payload.rightMenu,
        searchEngine: action.payload.searchEngine,
        location: action.payload.location
      }
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_FUTURE_DATA":
      return { ...state, futureData: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_FULL_LOCATION":
      return { ...state, fullLocation: action.payload };
    case "SET_SEARCH_ENGINE":
      return { ...state, searchEngine: action.payload };
    case "SET_RIGHT_MENU":
      return { ...state, rightMenu: action.payload };
    case "SET_FORECAST_TIME":
      return { ...state, forecastTime: action.payload };
    case "SET_TIME":
      return { ...state, time: action.payload };
    case "SET_UNIT":
      return { ...state, unit: action.payload };
    case "INCREMENT_INTERVAL":
      return { ...state, stateInterval: state.stateInterval + 1 };
    default:
      return state;
  }
};

export { initialState, reducer };
