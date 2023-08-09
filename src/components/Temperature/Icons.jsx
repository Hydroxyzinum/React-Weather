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

const Icons = React.memo(() => {
  const { data } = useSelector((state) => state.weatherData);

  const { main, icon } = data.weather[0];

  const nightIcon = ["01n", "02n", "03n", "04n"];

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
