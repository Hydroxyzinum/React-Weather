export const INITIAL_STATE = {
  interval: 0,
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

export function reducer(state, { type, payload }) {
  switch (type) {
    case "data":
      return {
        ...state,
        data: payload,
      };
    case "futureData":
      return {
        ...state,
        futureData: payload,
      };
    case "location":
      return {
        ...state,
        location: payload,
      };
    case "theme":
      return {
        ...state,
        theme: payload,
      };
    case "fullLocation":
      return {
        ...state,
        fullLocation: payload,
      };
    case "searchEngine":
      return {
        ...state,
        searchEngine: payload,
      };
    case "rightMenu":
      return {
        ...state,
        rightMenu: payload,
      };
    case "forecastTime":
      return {
        ...state,
        forecastTime: payload,
      };
    case "time":
      return {
        ...state,
        time: payload,
      };
    case "unit":
      return {
        ...state,
        unit: payload,
      };
    case 'interval':
      return {
        ...state,
        interval: payload,
      }
    default:
      return state;
  }
}
