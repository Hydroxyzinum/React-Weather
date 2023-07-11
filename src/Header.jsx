import axios from "axios";
import React, { useContext } from "react";
import { currentTimeUrl, currentWeatherUrl, geo, apiKeys } from "./url";
import { Context } from "./context";

const HeadFunc = ({ value }) => {
  const {
    data,
    setData,
    setFutureData,
    fullLocation,
    setFullLocation,
    setRightMenu,
    setTime,
    unit,
  } = value;

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Геолокация не поддерживается этим браузером.");
    }
  };

  const showPosition = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const { apiKey, reserveApiKey, timeApiKey, reserveTimeApiKey } = apiKeys;

    const geoCod = await axios.get(geo(apiKey, latitude, longitude));
    const { local_names } = geoCod.data[0];
    const { en } = local_names;

    if (fullLocation !== en && en.length !== 0) {
      const request = await axios.get(
        currentWeatherUrl("weather", en, apiKey, unit)
      );

      const future = await axios.get(
        currentWeatherUrl("forecast", en, apiKey, unit)
      );

      const getTime = await axios.get(
        currentTimeUrl(timeApiKey, latitude, longitude)
      );

      try {
        setData(request.data);
        setFutureData(future.data);
        setFullLocation(en);
        setTime(getTime.data);
      } catch (e) {
        if (e) {
          const geoCod = await axios.get(
            geo(reserveApiKey, latitude, longitude)
          );

          const { local_names } = geoCod.data[0];
          const { en } = local_names;

          const requestReserve = await axios.get(
            currentWeatherUrl("weather", en, reserveApiKey, unit)
          );

          const futureReserve = await axios.get(
            currentWeatherUrl("weather", en, reserveApiKey, unit)
          );

          const getTimeReserve = await axios.get(
            currentTimeUrl(reserveTimeApiKey, latitude, longitude)
          );

          setData(requestReserve.data);
          setFutureData(futureReserve.data);
          setFullLocation(en);
          setTime(getTimeReserve.data);
        }
      }
    } else {
      return null;
    }
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DRUIED:
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
      case error.UNKНЕТWN_ERROR:
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
        <p className="geoInfo">{data.name ? data.name : null}</p>
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
