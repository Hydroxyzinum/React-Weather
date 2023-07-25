import axios from "axios";
import React, { useContext } from "react";
import { apiKeys, currentWeatherUrl, geo } from "../helpers/url";
import { Context } from "../context/context";

// Функциональный компонент для отображения данных в шапке
const Header = () => {
  const contextData = useContext(Context);
  const { state, dispatch } = contextData;

  const { fullLocation, unit, data, time } = state;

  // Функция для получения геолокации пользователя
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Геолокация не поддерживается этим браузером.");
    }
  };

  // Функция для обработки успешного получения координат пользователя
  const showPosition = async (position) => {
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

  return (
    <div className="header">
      <div className="geo-container">
        <button
          onClick={() => getLocation()}
          type="button"
          className="geolocation"
        ></button>
        <p className="geoInfo">
          {data.name ? data.name : null}
          <br />
          <span className="geoTime">
            {time.time_24 ? time.time_24.slice(0, 5) : null}
          </span>
        </p>
      </div>
      <div className="search-container">
        <button
          onClick={() => dispatch({ type: "SET_RIGHT_MENU", payload: true })}
          className="click-field"
        >
          <span className="burger-line burger-first_line"></span>
          <span className="burger-line burger-second_line"></span>
          <span className="burger-line burger-third_line"></span>
        </button>
      </div>
    </div>
  );
};

export default Header;
