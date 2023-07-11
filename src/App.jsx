import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiKeys, currentWeatherUrl, currentTimeUrl } from "./url";
import { Context } from "./context";
import Menu from "./Menu";
import Parent from "./Parent";
import Header from "./Header";
import CurrentTemperature from "./CurrentTemperature";
import Main from "./Main";
import TodayTemp from "./TodayTemp";
import Forecast from "./Forecast";
import Desc from "./Desc";

function App() {
  const [stateInterval, setStateInterval] = useState(0);

  const [data, setData] = useState([]);

  const [futureData, setFutureData] = useState([]);

  const [location, setLocation] = useState("");

  const [fullLocation, setFullLocation] = useState("");

  const [searchEngine, setSearchEngine] = useState([]);

  const [rightMenu, setRightMenu] = useState("");

  const [forecastTime, setForecastTime] = useState(9);

  const [activeCard, setActiveCard] = useState(false);

  const [time, setTime] = useState({});

  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const { apiKey, reserveApiKey, timeApiKey, reserveTimeApiKey } = apiKeys;

    const getRequest = async (defaultCity, currentLocation) => {
      const requestLocation =
        currentLocation.length === 0 ? defaultCity : currentLocation;

      const request = await axios.get(
        currentWeatherUrl("weather", requestLocation, apiKey, unit)
      );

      const future = await axios.get(
        currentWeatherUrl("forecast", requestLocation, apiKey, unit)
      );

      try {
        setData(request.data);
        setFutureData(future.data);
      } catch (e) {
        if (e) {
          const requestReserve = await axios.get(
            currentWeatherUrl("weather", requestLocation, reserveApiKey, unit)
          );
          const futureReserve = await axios.get(
            currentWeatherUrl("forecast", requestLocation, reserveApiKey, unit)
          );
          setData(requestReserve.data);
          setFutureData(futureReserve.data);
        }
      }
      const timeout = setTimeout(async () => {
        const { lat, lon } = request.data.coord;
        try {
          const getTime = await axios.get(currentTimeUrl(timeApiKey, lat, lon));
          setTime(getTime.data);
        } catch (e) {
          if (e) {
            const getTime = await axios.get(
              currentTimeUrl(reserveTimeApiKey, lat, lon)
            );
            setTime(getTime.data);
          }
        }
      }, 400);
      return () => clearTimeout(timeout);
    };
    getRequest("Казань", fullLocation);
    const intervalFunc = setInterval(() => {
      getRequest("Казань", fullLocation);
      setStateInterval((prevState) => prevState + 1);
    }, 20000000);
    return () => clearInterval(intervalFunc);
  }, [unit, fullLocation, forecastTime, stateInterval]);

  return (
    <Context.Provider
      value={{
        setData,
        setFutureData,
        setTime,
        setSearchEngine,
        setLocation,
        setFullLocation,
        setRightMenu,
        setForecastTime,
        setActiveCard,
        setUnit,
        data,
        futureData,
        location,
        fullLocation,
        forecastTime,
        activeCard,
        searchEngine,
        rightMenu,
        time,
        unit,
      }}
    >
      <Parent>
        <Menu />
        <Header />
        <CurrentTemperature />
        <Main />
        <TodayTemp />
        <Forecast />
        <Desc />
      </Parent>
    </Context.Provider>
  );
}

export default React.memo(App);
