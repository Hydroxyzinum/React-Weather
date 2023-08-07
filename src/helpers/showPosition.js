import axios from "axios";
import { setData, setFutureData } from "../store/weatherDataSlice";
import { setFullLocation } from "../store/locationSlice";
import { apiKeys, currentWeatherUrl, geo } from "../helpers/url";
import { batch } from "react-redux";

export const getLocation = (fullLocation, unit, dispatch) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      showPosition(fullLocation, unit, dispatch),
      showError
    );
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

    localStorage.setItem('city', en);

    // Проверяем, изменилось ли местоположение, и делаем запросы на сервер
    if (fullLocation !== en && en.length !== 0) {
      const request = await axios.get(
        currentWeatherUrl("weather", en, apiKey, unit)
      );

      const future = await axios.get(
        currentWeatherUrl("forecast", en, apiKey, unit)
      );
      batch(() => {
        dispatch(setData(request.data));
        dispatch(setFutureData(future.data));
        dispatch(setFullLocation(en));
      });
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
      batch(() => {
        dispatch(setData(requestReserve.data));
        dispatch(setFutureData(futureReserve.data));
        dispatch(setFullLocation(en));
      });
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
