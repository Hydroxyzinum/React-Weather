import React from "react";
import { batch } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import {
  setData,
  setFutureData,
} from "../../store/slices/weatherDataSlice"; // Импорт экшенов из среза weatherDataSlice
import { setRightMenu, setUnit } from "../../store/slices/uiSlice"; // Импорт экшенов из среза uiSlice
import { setSearchEngine } from "../../store/slices/searchEngineSlice"; // Импорт экшенов из среза searchEngineSlice
import {
  setFullLocation,
  setLocation,
} from "../../store/slices/locationSlice"; // Импорт экшенов из среза locationSlice
import axios from "axios"; // Импорт библиотеки для работы с HTTP запросами
import cn from "classnames"; // Импорт библиотеки для работы с классами CSS
import { russia } from "../../helpers/russia"; // Импорт данных о российских городах
import { apiKeys, currentWeatherUrl } from "../../helpers/url"; // Импорт данных о API ключах и URL
import '../Menu/menu.css'; // Импорт стилей для компонента

const Menu = ({ children }) => {
  const dispatch = useDispatch();

  const { unit, rightMenu } = useSelector((state) => state.ui); // Получение данных из состояния Redux с помощью useSelector

  const { location } = useSelector((state) => state.location); // Получение данных из состояния Redux с помощью useSelector

  const { searchEngine } = useSelector((state) => state.searchEngine); // Получение данных из состояния Redux с помощью useSelector

  const formSubmit = async (e) => {
    e.preventDefault();

    const { apiKey, reserveApiKey } = apiKeys;

    try {
      const current = await axios.get(
        currentWeatherUrl("weather", location, apiKey, unit)
      );

      const future = await axios.get(
        currentWeatherUrl("forecast", location, apiKey, unit)
      );
      batch(() => {
        dispatch(setData(current.data)); // Обновление данных о текущей погоде
        dispatch(setFutureData(future.data)); // Обновление данных прогноза
        dispatch(setFullLocation(location)); // Обновление местоположения
        dispatch(setUnit(unit)); // Обновление единиц измерения
        dispatch(setRightMenu(false)); // Закрытие меню
        dispatch(setSearchEngine([])); // Очистка результатов поиска
        dispatch(setLocation("")); // Сброс значения местоположения
      });
    } catch (e) {
      switch (e.message) {
        case "Request failed with status code 404":
          return dispatch({ type: "SET_LOCATION", payload: "Не нашли :(" }); // Обработка ошибки 404 (местоположение не найдено)
        case "Request failed with status code 429":
          const currentReserve = await axios.get(
            currentWeatherUrl("weather", location, reserveApiKey, unit)
          );

          const futureReserve = await axios.get(
            currentWeatherUrl("forecast", location, reserveApiKey, unit)
          );
          batch(() => {
            dispatch(setData(currentReserve.data)); // Обновление текущих данных о погоде (резервные данные)
            dispatch(setFutureData(futureReserve.data)); // Обновление данных прогноза (резервные данные)
            dispatch(setFullLocation(location)); // Обновление местоположения
            dispatch(setUnit(unit)); // Обновление единиц измерения
            dispatch(setRightMenu(false)); // Закрытие меню
            dispatch(setSearchEngine([])); // Очистка результатов поиска
            dispatch(setLocation("")); // Сброс значения местоположения
          });
          break;
        default:
          return dispatch(setLocation("Неизвестная ошибка :(")); // Обработка других ошибок
      }
    }
  };

  const inputChange = async (e) => {
    e.preventDefault();

    const { value } = e.target;

    if (!value) {
      batch(() => {
        dispatch(setSearchEngine([])); // Очистка результатов поиска
        dispatch(setLocation("")); // Сброс значения местоположения
      });
      return null;
    } else {
      dispatch(setLocation(value)); // Установка значения местоположения
      const result = russia.filter(({ city }) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      dispatch(setSearchEngine(result)); // Обновление результатов поиска
    }
  };

  const classesblock = cn({
    "search-field": true,
    show: rightMenu, // Условное добавление класса для отображения меню
  });

  const resultCn = cn({
    "search-result_container": true,
    "p-10": searchEngine.length >= 1 ? true : false, // Условное добавление класса для отображения результатов поиска
  });

  return (
    <div className={classesblock}>
      <div className="сontrol-panel_block">
        <div className="panel-block">
          <button
            onClick={() => {
              dispatch(setRightMenu(false)); // Закрытие меню при клике на кнопку
            }}
            className="click-exit"
          >
            <span className="exit-line exit-first_line"></span>
            <span className="exit-line exit-second_line"></span>
          </button>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={formSubmit} className="form-search">
          <label className="sr-only" htmlFor="search"></label>
          <input
            className="search-input"
            autoFocus
            onChange={inputChange}
            id="search"
            value={location}
            type="text"
            placeholder="Поиск"
            autoComplete="off"
          />
          <div className={resultCn}>
            <ul className="listSearch">{children}</ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Menu;