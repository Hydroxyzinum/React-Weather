import React, { useContext } from "react";
import axios from "axios";
import cn from "classnames";
import _ from "lodash";
import { apiKeys, currentWeatherUrl } from "../url/url";
import { Context } from "../Context/context";
import { russia } from "../russia";

// Компонент-контейнер для меню с поиском города и переключателем единиц измерения
const MenuContainer = ({ value, children }) => {
  const {
    setData,
    setFutureData,
    setSearchEngine,
    setLocation,
    setFullLocation,
    setRightMenu,
    searchEngine,
    location,
    rightMenu,
    setUnit,
    unit,
  } = value;

  // Обработчик для отправки формы поиска города
  const formSubmit = async (e) => {
    e.preventDefault();

    const { apiKey, reserveApiKey } = apiKeys;

    const current = await axios.get(
      currentWeatherUrl("weather", location, apiKey, unit)
    );

    const future = await axios.get(
      currentWeatherUrl("forecast", location, apiKey, unit)
    );

    try {
      setData(current.data);
      setFutureData(future.data);
      setFullLocation(location);
      setUnit(unit);
      setRightMenu(false);
      setSearchEngine([]);
      setLocation("");
    } catch (e) {
      if (e) {
        return setLocation("Не нашли :(");
      } else {
        const currentReserve = await axios.get(
          currentWeatherUrl("weather", location, reserveApiKey, unit)
        );

        const futureReserve = await axios.get(
          currentWeatherUrl("forecast", location, reserveApiKey, unit)
        );

        setData(currentReserve.data);
        setFutureData(futureReserve.data);
        setUnit(unit);
        setFullLocation(location);
        setRightMenu(false);
        setSearchEngine([]);
        setLocation("");
      }
    }
  };

  // Обработчик для изменения значения поля ввода поиска города
  const inputChange = async (e) => {
    e.preventDefault();

    const { value } = e.target;

    if (!value) {
      setSearchEngine([]);
      setLocation("");
      return null;
    } else {
      setLocation(value);
      const result = russia.filter(({ city }) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSearchEngine(result);
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
          <button onClick={() => setRightMenu(false)} className="click-exit">
            <span className="exit-line exit-first_line"></span>
            <span className="exit-line exit-second_line"></span>
          </button>
          {/* Переключатель между единицами измерения */}
          <label className="switch">
            <input
              onClick={(e) =>
                e.target.checked ? setUnit("imperial") : setUnit("metric")
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

// Компонент, который отображает элементы результата поиска городов
const RenderSearchItem = ({ value }) => {
  const { searchEngine, setLocation } = value;

  // Создание массива с элементами результата поиска и их отображение
  const memoSearchItem = React.useMemo(() => {
    if (searchEngine.length !== 0) {
      const newArr =
        searchEngine.length > 11 ? searchEngine.slice(0, 11) : searchEngine;
      return newArr.map(({ region, city }) => {
        return (
          <div key={_.uniqueId("city-")} className="buttons">
            <button
              onClick={() => setLocation(city)}
              type="submit"
              className="searchedItem"
            >
              {city ? city : null}{" "}
              <span className="region-name">({region ? region : null})</span>
            </button>
          </div>
        );
      });
    } else {
      return <div className="p-10">Ожидание запроса...</div>;
    }
  }, [searchEngine, setLocation]);

  return memoSearchItem;
};

// Компонент меню, который использует MenuContainer и RenderSearchItem
const Menu = () => {
  const contextData = useContext(Context);
  return (
    <MenuContainer value={contextData}>
      <RenderSearchItem value={contextData}></RenderSearchItem>
    </MenuContainer>
  );
};

export default Menu;
