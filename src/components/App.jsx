import React, { useEffect, useReducer, useState } from "react";
import { initialState, reducer } from "../reducers/reducer";
import { Context } from "../context/context";
import { apiKeys, currentWeatherUrl, currentTimeUrl } from "../helpers/url";
import { setBackground } from "../helpers/bgColors";
import axios from "axios";
import Menu from "./Menu";
import RenderSearchItem from "./RenderSearchItem";
import Parent from "./Parent";
import Header from "./Header";
import CurrentTemperature from "./CurrentTemperature";
import Sunrise from "./Sunrise";
import Main from "./Main";
import TodayTemp from "./TodayTemp";
import ForecastContainer from "./ForecastContainer";
import ForecastListContainer from "./ForecastListContainer";
import Forecast from "./Forecast";
import DescContainer from "./DescContainer";
import Desc from "./Desc";
import Info from "./Info";
import ErrorPopUp from "./PopUps/ErrorPopUp";

const App = () => {
  // Используем useReducer для управления состоянием
  const [isFirstEffectExecuted, setFirstEffectExecuted] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  // Извлекаем необходимые значения из состояния
  const { data, unit, fullLocation, forecastTime, stateInterval } = state;

  // Функция для установки темы (стилей) компонента
  const handleSetTheme = (theme) => {
    dispatch({ type: "SET_THEME", payload: theme });
  };
  // Эффект для получения данных о погоде при монтировании и обновлениях компонента
  useEffect(() => {
    // Функция для получения данных о погоде по API
    const getRequest = async (defaultCity, currentLocation) => {
      const { apiKey, reserveApiKey } = apiKeys;

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
        dispatch({
          type: "SET_DATA_AND_FUTURE_DATA",
          payload: { data: request.data, futureData: future.data },
        });

        dispatch({ type: "SET_FULL_LOCATION", payload: requestLocation });
      } catch (e) {
        if (e.message === "Request failed with status code 429") {
          const requestReserve = await axios.get(
            currentWeatherUrl("weather", requestLocation, reserveApiKey, unit)
          );
          const futureReserve = await axios.get(
            currentWeatherUrl("forecast", requestLocation, reserveApiKey, unit)
          );

          // Устанавливаем данные из резервных запросов в состояние
          dispatch({
            type: "SET_DATA_AND_FUTURE_DATA",
            payload: {
              data: requestReserve.data,
              futureData: futureReserve.data,
            },
          });
          dispatch({ type: "SET_FULL_LOCATION", payload: requestLocation });
        } else {
          return <ErrorPopUp error={e.message} />;
        }
      }
    };

    // Вызываем функцию для получения данных о погоде при первой загрузке приложения
    getRequest("Казань", fullLocation);

    // Устанавливаем интервал обновления данных о погоде (каждые 80 секунд)
    const intervalFunc = setInterval(() => {
      getRequest("Казань", fullLocation);
      dispatch({ type: "INCREMENT_INTERVAL" });
    }, 60000);

    // Очищаем интервал при размонтировании компонента, чтобы предотвратить утечки памяти
    return () => clearInterval(intervalFunc);
  }, [unit, forecastTime, fullLocation, stateInterval]);

  // Эффект для получения текущего времени при монтировании и обновлениях компонента
  useEffect(() => {
    // Функция для получения текущего времени по API
    const getTimeData = async () => {
      const { timeApiKey, reserveTimeApiKey } = apiKeys;

      if (data.length !== 0) {
        const { lat, lon } = data.coord;
        try {
          const getTime = await axios.get(currentTimeUrl(timeApiKey, lat, lon));

          // Устанавливаем данные о текущем времени и фоновой теме в состояние
          dispatch({ type: "SET_TIME", payload: getTime.data });
          setBackground(getTime.data, handleSetTheme);
        } catch (e) {
          if (e.message === "Request failed with status code 429") {
            const getTime = await axios.get(
              currentTimeUrl(reserveTimeApiKey, lat, lon)
            );
            dispatch({ type: "SET_TIME", payload: getTime.data });
            setBackground(getTime.data, handleSetTheme);
          } else {
            return <ErrorPopUp error={e.message} />;
          }
        }
      } else {
        return <ErrorPopUp error={"Bad Request :("} />;
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

  useEffect(() => {
    if (!isFirstEffectExecuted && state.data.length !== 0) {
      localStorage.setItem("state", JSON.stringify(state));
      setFirstEffectExecuted(true);
    }
  }, [state, isFirstEffectExecuted]);

  if (state.data.length !== 0) {
    return (
      // Оборачиваем компоненты в провайдер контекста, чтобы предоставить доступ к состояниям всему дереву компонентов
      <Context.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <Parent>
          <Menu>
            <RenderSearchItem />
          </Menu>
          <Header />
          <CurrentTemperature />
          <Main />
          <TodayTemp />
          <ForecastContainer>
            <ForecastListContainer>
              <Forecast />
            </ForecastListContainer>
          </ForecastContainer>
          <DescContainer>
            <Desc />
          </DescContainer>
          <Sunrise />
          <Info />
        </Parent>
      </Context.Provider>
    );
  } else {
    const localState = JSON.parse(localStorage.getItem("state"));
    <Context.Provider
      value={{
        localState,
        dispatch,
      }}
    >
      <Parent>
        <Menu>
          <RenderSearchItem />
        </Menu>
        <Header />
        <CurrentTemperature />
        <Main />
        <TodayTemp />
        <ForecastContainer>
          <ForecastListContainer>
            <Forecast />
          </ForecastListContainer>
        </ForecastContainer>
        <DescContainer>
          <Desc />
        </DescContainer>
        <Sunrise />
        <Info />
      </Parent>
    </Context.Provider>;
  }
};

export default App;
