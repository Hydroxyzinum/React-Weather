import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiKeys, currentWeatherUrl, currentTimeUrl } from "../url";
import { Context } from "../Context/context";
import { setBackground } from '../styles/bgColors';

import Menu from "./Menu";
import Parent from "./Parent";
import Header from "./Header";
import CurrentTemperature from "./CurrentTemperature";
import Sunrise from "./Sunrise";
import Main from "./Main";
import TodayTemp from "./TodayTemp";
import Forecast from "./Forecast";
import Desc from "./Desc";
import WeatherInfo from "./WeatherInfo";

function App() {
  // State для хранения значения интервала обновления данных
  const [stateInterval, setStateInterval] = useState(0);

  // State для хранения данных о текущей погоде
  const [data, setData] = useState([]);

  // State для хранения данных о будущей погоде
  const [futureData, setFutureData] = useState([]);

  // State для хранения текущего местоположения
  const [location, setLocation] = useState("");

  // State для хранения темы (стилей) компонента, зависящей от времени суток
  const [theme, setTheme] = useState({});

  // State для хранения полного названия текущего местоположения
  const [fullLocation, setFullLocation] = useState("");

  // State для хранения результатов поиска местоположений
  const [searchEngine, setSearchEngine] = useState([]);

  // State для хранения состояния правого меню
  const [rightMenu, setRightMenu] = useState("");

  // State для хранения периода прогноза (количество часов в будущем)
  const [forecastTime, setForecastTime] = useState(9);

  // State для хранения текущего времени
  const [time, setTime] = useState({});

  // State для хранения единиц измерения температуры (метрические или имперские)
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    // Функция для получения данных о погоде по API
    const getRequest = async (defaultCity, currentLocation) => {
      const { apiKey, reserveApiKey } = apiKeys;

      // Если текущее местоположение пустое, используем значение defaultCity (Казань)
      const requestLocation =
        currentLocation.length === 0 ? defaultCity : currentLocation;

      try {
        const request = await axios.get(
          currentWeatherUrl("weather", requestLocation, apiKey, unit)
        );
        const future = await axios.get(
          currentWeatherUrl("forecast", requestLocation, apiKey, unit)
        );

        // Устанавливаем данные о текущей погоде и будущей погоде в состояние
        setData(request.data);
        setFutureData(future.data);
        setFullLocation(requestLocation);
      } catch (e) {
        // Если возникла ошибка, используем резервные ключи API для запросов
        const requestReserve = await axios.get(
          currentWeatherUrl("weather", requestLocation, reserveApiKey, unit)
        );
        const futureReserve = await axios.get(
          currentWeatherUrl("forecast", requestLocation, reserveApiKey, unit)
        );

        // Устанавливаем данные из резервных запросов в состояние
        setFullLocation(requestLocation);
        setData(requestReserve.data);
        setFutureData(futureReserve.data);
      }
    };

    // Вызываем функцию для получения данных о погоде при первой загрузке приложения
    getRequest("Казань", fullLocation);

    // Устанавливаем интервал обновления данных о погоде (каждые 60 секунд)
    const intervalFunc = setInterval(() => {
      getRequest("Казань", fullLocation);
      // Обновляем значение stateInterval, чтобы перезапустить интервал при его очередном завершении
      setStateInterval((prevState) => prevState + 1);
    }, 60000);

    // Очищаем интервал при размонтировании компонента, чтобы предотвратить утечки памяти
    return () => clearInterval(intervalFunc);
  }, [unit, fullLocation, forecastTime, stateInterval]);

  useEffect(() => {
    // Функция для получения текущего времени по API
    const getTimeData = async () => {
      const { timeApiKey, reserveTimeApiKey } = apiKeys;

      if (data.length !== 0) {
        const { lat, lon } = data.coord;

        try {
          const getTime = await axios.get(currentTimeUrl(timeApiKey, lat, lon));

          // Устанавливаем данные о текущем времени и фоновой теме в состояние
          setTime(getTime.data);
          setBackground(getTime.data, setTheme);
        } catch (e) {
          const getTime = await axios.get(
            currentTimeUrl(reserveTimeApiKey, lat, lon)
          );
          setTime(getTime.data);
          setBackground(getTime.data, setTheme);
        }
      } else {
        return null;
      }
    };

    // Вызываем функцию для получения данных о текущем времени
    getTimeData();

    // Устанавливаем таймаут, чтобы обновлять фоновую тему каждые 200 миллисекунд
    const timeout = setTimeout(() => {
      getTimeData();
    }, 200);

    // Очищаем таймаут при размонтировании компонента, чтобы предотвратить утечки памяти
    return () => clearTimeout(timeout);
  }, [data.coord, data.length]);

  return (
    // Оборачиваем компоненты в провайдер контекста, чтобы предоставить доступ к состояниям всему дереву компонентов
    <Context.Provider
      value={{
        setData,
        setFutureData,
        setTime,
        setSearchEngine,
        setLocation,
        setTheme,
        setFullLocation,
        setRightMenu,
        setForecastTime,
        setUnit,
        data,
        futureData,
        location,
        theme,
        fullLocation,
        forecastTime,
        searchEngine,
        rightMenu,
        time,
        unit,
      }}
    >
      {/* Обертка для компонентов, которая использует контекст */}
      <Parent>
        <Menu />
        <Header />
        <CurrentTemperature />
        <Main />
        <TodayTemp />
        <Forecast />
        <Desc />
        <Sunrise />
        <WeatherInfo></WeatherInfo>
      </Parent>
    </Context.Provider>
  );
}

export default React.memo(App);
