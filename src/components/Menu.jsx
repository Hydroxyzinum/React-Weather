import React, { useContext } from "react";
import axios from "axios";
import cn from "classnames";
import { Context } from "../context/context";
import { russia } from "../helpers/russia";
import { apiKeys, currentWeatherUrl } from "../helpers/url";

const Menu = ({ children }) => {
  const contextData = useContext(Context);

  const { dispatch } = contextData;

  const { location, rightMenu, unit, searchEngine } = contextData.state
    ? contextData.state
    : contextData.localState;

  // Обработчик для отправки формы поиска города
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

      dispatch({
        type: "SET_DATA_AND_FUTURE_DATA",
        payload: {
          data: current.data,
          futureData: future.data,
        },
      });
      dispatch({
        type: "SET_FULL_DATA",
        payload: {
          fullLocation: location,
          unit: unit,
          rightMenu: false,
          searchEngine: [],
          location: "",
        },
      });
    } catch (e) {
      switch (e.message) {
        case "Request failed with status code 404":
          return dispatch({ type: "SET_LOCATION", payload: "Не нашли :(" });
        case "Request failed with status code 429":
          const currentReserve = await axios.get(
            currentWeatherUrl("weather", location, reserveApiKey, unit)
          );

          const futureReserve = await axios.get(
            currentWeatherUrl("forecast", location, reserveApiKey, unit)
          );
          dispatch({
            type: "SET_DATA_AND_FUTURE_DATA",
            payload: {
              data: currentReserve.data,
              futureData: futureReserve.data,
            },
          });
          dispatch({
            type: "SET_FULL_DATA",
            payload: {
              fullLocation: location,
              unit: unit,
              rightMenu: false,
              searchEngine: [],
              location: "",
            },
          });
          break;
        default:
          return dispatch({
            type: "SET_LOCATION",
            payload: "Интернет отсутсвует",
          });
      }
    }
  };

  // Обработчик для изменения значения поля ввода поиска города
  const inputChange = async (e) => {
    e.preventDefault();

    const { value } = e.target;

    if (!value) {
      dispatch({ type: "SET_SEARCH_ENGINE", payload: [] });
      dispatch({ type: "SET_LOCATION", payload: "" });
      return null;
    } else {
      dispatch({ type: "SET_LOCATION", payload: value });
      const result = russia.filter(({ city }) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      dispatch({ type: "SET_SEARCH_ENGINE", payload: result });
    }
  };

  // Классы для стилизации контейнера поиска в зависимости от состояния меню
  const classesblock = cn({
    "search-field": true,
    show: rightMenu,
  });

  // Классы для стилизации контейнера результатов поиска в зависимости от количества результатов
  const resultCn = cn({
    "search-result_container": true,
    "p-10": searchEngine.length >= 1 ? true : false,
  });

  return (
    <div className={classesblock}>
      <div className="сontrol-panel_block">
        <div className="panel-block">
          {/* Кнопка для закрытия меню */}
          <button
            onClick={() => dispatch({ type: "SET_RIGHT_MENU", payload: false })}
            className="click-exit"
          >
            <span className="exit-line exit-first_line"></span>
            <span className="exit-line exit-second_line"></span>
          </button>
          {/* Переключатель между единицами измерения */}
          <label className="switch">
            <input
              onClick={(e) =>
                e.target.checked
                  ? dispatch({ type: "SET_UNIT", payload: "imperial" })
                  : dispatch({ type: "SET_UNIT", payload: "metric" })
              }
              type="checkbox"
            />
            <span className="slider round"></span>
            <span className="farenheit">F°</span>
            <span className="celsium">C°</span>
          </label>
        </div>
      </div>
      <div className="form-container">
        {/* Форма для поиска города */}
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
          {/* Контейнер для результатов поиска */}
          <div className={resultCn}>
            <ul className="listSearch">{children}</ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Menu;
