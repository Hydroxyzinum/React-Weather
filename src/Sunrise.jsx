import React, { useContext } from "react";
import { Context } from "./context";

const RisingSun = ({ value }) => {
  const { data } = value;

  const { sunrise, sunset } = data.sys;

  const sunriseTime = new Date(sunrise * 1000);

  const sunsetTime = new Date(sunset * 1000);

  const { normalizeSunrise, normalizeSunset } = {
    normalizeSunrise: `${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`,
    normalizeSunset: `${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`,
  };

  return (
    <div className="sunrise-container">
      <div className="sunrise">
        <p className="sunrise-text">Восход</p>
        <img className="sunrise-img" src="weather/sunrise.png" alt="" />
        <p className="sunrise-time">{normalizeSunrise}</p>
      </div>
      <div className="sunset">
        <p className="sunrise-text">Закат</p>
        <img className="sunrise-img" src="weather/sunset.png" alt="" />
        <p className="sunrise-time">{normalizeSunset}</p>
      </div>
    </div>
  );
};

const Sunrise = () => {
  const contextData = useContext(Context);
  return <RisingSun value={contextData}></RisingSun>;
};

export default Sunrise;
