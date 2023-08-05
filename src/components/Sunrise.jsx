import React from "react";
import { useSelector } from "react-redux";

const Sunrise = () => {
  const { data } = useSelector((state) => state.weatherData);

  const { sunrise, sunset } = data.sys;

  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="sunrise-container">
      <div className="sunrise">
        <p className="sunrise-text">Восход</p>
        <img className="sunrise-img" src="weather/sunrise.png" alt="" />
        <p className="sunrise-time">{sunriseTime}</p>
      </div>
      <div className="sunset">
        <p className="sunrise-text">Закат</p>
        <img className="sunrise-img" src="weather/sunset.png" alt="" />
        <p className="sunrise-time">{sunsetTime}</p>
      </div>
    </div>
  );
};

export default Sunrise;
