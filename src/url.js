export const apiKeys = {
  apiKey: "1c4afe47616db2dccb37f9ab0a7613ec",
  reserveApiKey: "769c5d54f63e3b72948c59d98808f5ce",
  timeApiKey: "BIXQFYMOF28A",
  reserveTimeApiKey: "V9DXRM72FM2R",
};

export const currentWeatherUrl = (type, city, apiKey, units) => {
  return `https://api.openweathermap.org/data/2.5/${type}?&lang=ru&q=${city}&appid=${apiKey}&units=${units}`;
};

export const currentTimeUrl = (apiKey, lat, lon) => {
  return `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
};

export const geo = (apiKey, lat, lon) => {
  return `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
};
