import React from "react";
import { getLocation } from "../../helpers/showPosition"; // Импорт функции для получения местоположения
import { useSelector, useDispatch } from "react-redux";
import { setRightMenu, setSettingsMenu } from "../../store/slices/uiSlice"; // Импорт экшенов для управления интерфейсом
import '../Header/header.css'; // Импорт стилей для компонента

const Header = () => {
  const dispatch = useDispatch();

  // Получение данных о погоде и времени из состояния Redux
  const { data, time } = useSelector((state) => state.weatherData);

  // Получение данных о выбранных настройках из состояния Redux
  const { unit, fullLocation } = useSelector((state) => state.ui);

  return (
    <div className="header">
      <div className="geo-container">
        {/* Кнопка для запроса геолокации */}
        <button
          onClick={() => getLocation(fullLocation, unit, dispatch)}
          type="button"
          className="geolocation"
        ></button>
        <p className="geoInfo">
          {/* Отображение имени местоположения и времени */}
          {data.name ? data.name : null}
          <br />
          <span className="geoTime">
            {time.time_24 ? time.time_24.slice(0, 5) : null}
          </span>
        </p>
      </div>
      <div className="search-container">
        {/* Кнопка для открытия меню настроек */}
        <button
          onClick={() => dispatch(setSettingsMenu(true))}
          className="click-settings"
        ></button>
        {/* Кнопка для открытия бокового меню */}
        <button
          onClick={() => dispatch(setRightMenu(true))}
          className="click-field"
        ></button>
      </div>
    </div>
  );
};

export default Header;
