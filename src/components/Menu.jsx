import React from "react";
import { batch } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { setData, setFutureData } from "../store/weatherDataSlice";
import { setRightMenu, setUnit } from "../store/uiSlice";
import { setSearchEngine } from "../store/searchEngineSlice";
import { setFullLocation, setLocation } from "../store/locationSlice";
import axios from "axios";
import cn from "classnames";
import { russia } from "../helpers/russia";
import { apiKeys, currentWeatherUrl } from "../helpers/url";

const Menu = ({ children }) => {
  const dispatch = useDispatch();

  const { unit, rightMenu } = useSelector((state) => state.ui);

  const { location } = useSelector((state) => state.location);

  const { searchEngine } = useSelector((state) => state.searchEngine);

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
        dispatch(setData(current.data));
        dispatch(setFutureData(future.data));
        dispatch(setFullLocation(location));
        dispatch(setUnit(unit));
        dispatch(setRightMenu(false));
        dispatch(setSearchEngine([]));
        dispatch(setLocation(""));
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
          batch(() => {
            dispatch(setData(currentReserve.data));
            dispatch(setFutureData(futureReserve.data));
            dispatch(setFullLocation(location));
            dispatch(setUnit(unit));
            dispatch(setRightMenu(false));
            dispatch(setSearchEngine([]));
            dispatch(setLocation(""));
          });
          break;
        default:
          return dispatch(setLocation("Неизвестная ошибка :("));
      }
    }
  };

  const inputChange = async (e) => {
    e.preventDefault();

    const { value } = e.target;

    if (!value) {
      batch(() => {
        dispatch(setSearchEngine([]));
        dispatch(setLocation(""));
      });
      return null;
    } else {
      dispatch(setLocation(value));
      const result = russia.filter(({ city }) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      dispatch(setSearchEngine(result));
    }
  };

  const classesblock = cn({
    "search-field": true,
    show: rightMenu,
  });

  const resultCn = cn({
    "search-result_container": true,
    "p-10": searchEngine.length >= 1 ? true : false,
  });

  return (
    <div className={classesblock}>
      <div className="сontrol-panel_block">
        <div className="panel-block">
          <button
            onClick={() => {
              dispatch(setRightMenu(false));
            }}
            className="click-exit"
          >
            <span className="exit-line exit-first_line"></span>
            <span className="exit-line exit-second_line"></span>
          </button>

          <label className="switch">
            <input
              onClick={(e) =>
                e.target.checked
                  ? dispatch(setUnit("imperial"))
                  : dispatch(setUnit("metric"))
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
