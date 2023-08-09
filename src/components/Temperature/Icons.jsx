import React from "react";

import { useSelector } from "react-redux";
import {
  SuperMoon,
  Cloudy,
  Sunny,
  Snowy,
  Stormy,
  Thunderstorm,
  Mists,
} from "../../helpers/animationsBlocks";

// Компонента Icons, отвечающая за отображение анимированных иконок погоды
const Icons = React.memo(() => {
  // Получение данных о погоде из состояния Redux
  const { data } = useSelector((state) => state.weatherData);

  // Извлечение информации о текущей погоде из объекта data
  const { main, icon } = data.weather[0];

  // Список иконок, которые соответствуют ночному времени
  const nightIcon = ["01n", "02n", "03n", "04n"];

  // Список атмосферных явлений, для которых используется анимация Mists
  const atmosphereMain = [
    "Mist",
    "Smoke",
    "Haze",
    "Dust",
    "Fog",
    "Sand",
    "Ash",
    "Squall",
    "Tornado",
  ];

  // Выбор подходящей анимированной иконки в зависимости от условий
  if (nightIcon.includes(icon)) {
    return <SuperMoon />;
  } else if (atmosphereMain.includes(main)) {
    return <Mists />;
  } else {
    switch (main) {
      case "Clear":
        return <Sunny />;
      case "Clouds":
        return <Cloudy />;
      case "Snow":
        return <Snowy />;
      case "Rain":
        return <Stormy />;
      case "Thunderstorm":
        return <Thunderstorm />;
      case "Drizzle":
        return <Stormy />;
      default:
        return <Cloudy />;
    }
  }
});

export default Icons;
