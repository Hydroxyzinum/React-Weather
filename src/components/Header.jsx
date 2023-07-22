import axios from "axios";
import React, { useContext } from "react";
import { currentWeatherUrl, geo, apiKeys } from "../url";
import { Context } from "../Context/context";

// Функциональный компонент для отображения данных в шапке
const HeadFunc = ({ value }) => {
  const {
    data,
    time,
    setData,
    setFutureData,
    fullLocation,
    setFullLocation,
    setRightMenu,
    unit,
  } = value;

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

      try {
        setData(request.data);
        setFutureData(future.data);
        setFullLocation(en);
      } catch (e) {
        // В случае ошибки делаем запросы на резервный API ключ
        const geoCod = await axios.get(geo(reserveApiKey, latitude, longitude));
        const { local_names } = geoCod.data[0];
        const { en } = local_names;

        const requestReserve = await axios.get(
          currentWeatherUrl("weather", en, reserveApiKey, unit)
        );

        const futureReserve = await axios.get(
          currentWeatherUrl("weather", en, reserveApiKey, unit)
        );

        setData(requestReserve.data);
        setFutureData(futureReserve.data);
        setFullLocation(en);
      }
    } else {
      return null;
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
          <br></br>
          <span className="geoTime">
            {time.time_24 ? time.time_24.slice(0, 5) : null}
          </span>
        </p>
      </div>
      <div className="search-container">
        <button onClick={() => setRightMenu(true)} className="click-field">
          <span className="burger-line burger-first_line"></span>
          <span className="burger-line burger-second_line"></span>
          <span className="burger-line burger-third_line"></span>
        </button>
      </div>
    </div>
  );
};

const Header = () => {
  const contextData = useContext(Context);
  return <HeadFunc value={contextData}></HeadFunc>;
};

export default Header;
