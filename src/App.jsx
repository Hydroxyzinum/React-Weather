import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiKeys, currentWeatherUrl, currentTimeUrl } from "./url";
import { Context } from "./context";
import { setBackground } from "./theme";
import Menu from "./Menu";
import Parent from "./Parent";
import Header from "./Header";
import CurrentTemperature from "./CurrentTemperature";
import Sunrise from "./Sunrise";
import Main from "./Main";
import TodayTemp from "./TodayTemp";
import Forecast from "./Forecast";
import Desc from "./Desc";
import CryptoJS from 'crypto-js';

function App() {
  const [stateInterval, setStateInterval] = useState(0);

  const [data, setData] = useState([]);

  const [futureData, setFutureData] = useState([]);

  const [location, setLocation] = useState("");

  const [theme, setTheme] = useState({});

  const [fullLocation, setFullLocation] = useState("");

  const [searchEngine, setSearchEngine] = useState([]);

  const [rightMenu, setRightMenu] = useState("");

  const [forecastTime, setForecastTime] = useState(9);

  const [time, setTime] = useState({});

  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const crypt = CryptoJS.AES.encrypt('Привет как дела', "123").toString();
    const decrypt = CryptoJS.AES.decrypt(crypt, '123');
    const der = decrypt.toString(CryptoJS.enc.Utf8);

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
        } else {
          console.error(e);
        }
      }
      const timeout = setTimeout(async () => {
        const { lat, lon } = request.data.coord;
        try {
          const getTime = await axios.get(currentTimeUrl(timeApiKey, lat, lon));
          setTime(getTime.data);
          setBackground(getTime.data, setTheme);
        } catch (e) {
          if (e) {
            const getTime = await axios.get(
              currentTimeUrl(reserveTimeApiKey, lat, lon)
            );
            setTime(getTime.data);
            setBackground(getTime.data, setTheme);
          } else {
            console.error(e);
          }
        }
      }, 150);
      return () => clearTimeout(timeout);
    };
    getRequest("Казань", fullLocation);
    const intervalFunc = setInterval(() => {
      getRequest("Казань", fullLocation);
      setStateInterval((prevState) => prevState + 1);
    }, 20000);
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
      <Parent>
        <Menu />
        <Header />
        <CurrentTemperature />

        <Main />
        <Sunrise />
        <TodayTemp />
        <Forecast />
        <Desc />
      </Parent>
    </Context.Provider>
  );
}

export default React.memo(App);
