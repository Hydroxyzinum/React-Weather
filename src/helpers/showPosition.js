import axios from "axios";
import { apiKeys, currentWeatherUrl, geo } from "../helpers/url";

export const getLocation = (fullLocation, unit, dispatch) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition(fullLocation, unit, dispatch), showError);
  } else {
    alert("Геолокация не поддерживается этим браузером.");
  }
};

// Функция для обработки успешного получения координат пользователя
const showPosition = (fullLocation, unit, dispatch) => async (position) => {
  const latitude = position.coords.latitude;

  const longitude = position.coords.longitude;

  const { apiKey, reserveApiKey } = apiKeys;

  try {
    // Получаем информацию о местоположении на английском языке
    const geoCod = await axios.get(geo(apiKey, latitude, longitude));

    const { local_names } = geoCod.data[0];

    const { en } = local_names;

    // Проверяем, изменилось ли местоположение, и делаем запросы на сервер
    if (fullLocation !== en && en.length !== 0) {
      const request = await axios.get(
        currentWeatherUrl("weather", en, apiKey, unit)
      );

      const future = await axios.get(
        currentWeatherUrl("forecast", en, apiKey, unit)
      );

      dispatch({
        type: "SET_DATA_AND_FUTURE_DATA",
        payload: { data: request.data, futureData: future.data },
      });
      dispatch({ type: "SET_FULL_LOCATION", payload: en });
    }
  } catch (e) {
    if (e.message === "Request failed with status code 429") {
      const geoCod = await axios.get(geo(reserveApiKey, latitude, longitude));

      const { local_names } = geoCod.data[0];
      
      const { en } = local_names;

      const requestReserve = await axios.get(
        currentWeatherUrl("weather", en, reserveApiKey, unit)
      );

      const futureReserve = await axios.get(
        currentWeatherUrl("forecast", en, reserveApiKey, unit)
      );

      dispatch({
        type: "SET_DATA_AND_FUTURE_DATA",
        payload: {
          data: requestReserve.data,
          futureData: futureReserve.data,
        },
      });
      dispatch({ type: "SET_FULL_LOCATION", payload: en });
    } else {
      console.error("Error fetching data:", e);
    }
  }
};

// Функция для обработки ошибок получения геолокации
const showError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Пользователь отклонил запрос на геолокацию.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Информация о местоположении недоступна.");
      break;
    case error.TIMEOUT:
      alert(
        "Истекло время ожидания запроса на получение местоположения пользователя."
      );
      break;
    case error.UNKNOWN_ERROR:
      alert("Произошла неизвестная ошибка.");
      break;
    default:
      break;
  }
};

