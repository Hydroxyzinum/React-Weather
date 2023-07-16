const currentApikey = process.env.REACT_APP_API_KEY;
const reserveCurrentApiKey = process.env.REACT_APP_API_KEY_RESERVE;
const timeApi = process.env.REACT_APP_API_KEY_TIME;
const reserveTimeApi = process.env.REACT_APP_API_KEY_TIME_RESERVE;

export const apiKeys = {
  apiKey: currentApikey,
  reserveApiKey: reserveCurrentApiKey,
  timeApiKey: timeApi,
  reserveTimeApiKey: reserveTimeApi,
};

export const currentWeatherUrl = (type, city, apiKey, units) => {
  return `https://api.openweathermap.org/data/2.5/${type}?&lang=ru&q=${city}&appid=${apiKey}&units=${units}`;
};

export const currentTimeUrl = (apiKey, lat, lon) => {
  return `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&lat=${lat}8&long=${lon}`;
};

export const geo = (apiKey, lat, lon) => {
  return `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
};
