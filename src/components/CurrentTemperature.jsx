import React, { useContext } from "react";
import animationsBlock from "../animationsBlocks";
import { Context } from "../context";

const Temperature = ({ children, value }) => {
  const { data } = value;

  const { name } = data;

  const { temp, temp_max, temp_min, feels_like } = data.main;

  const { description } = data.weather[0];

  const normalizeDesc = `${description[0].toUpperCase()}${description.slice(
    1
  )}`;

  const normalizeData = {
    temperature: Math.floor(temp),
    temperatureMax: Math.ceil(temp_max),
    temperatureMin: Math.floor(temp_min),
    feelsLike: Math.floor(feels_like),
  };

  const { temperature, temperatureMax, temperatureMin, feelsLike } =
    normalizeData;

  return (
    <div className="weather-image_container">
      <div className="image-container">{children}</div>
      <h1 className="choose_city">{name ? name : null}</h1>
      <h2 className="temperature">
        {temp ? temperature : null}
        <span className="gradus">°</span>
      </h2>
      <p className="description">{normalizeDesc ? normalizeDesc : null}</p>
      <div className="min-max_temperature">
        <p className="max-temp">
          Макс.: {temp_max ? temperatureMax : null}
          <span className="gradus">°</span>
        </p>
        <p className="min-temp">
          Мин.: {temp_min ? temperatureMin : null}
          <span className="gradus">°</span>
        </p>
      </div>
      <div className="feels-like_container">
        <p className="feels-like">
          Ощущается как: {feels_like ? feelsLike : null}
          <span className="gradus">°</span>
        </p>
      </div>
    </div>
  );
};

const IconGenerator = ({ value }) => {
  const { data } = value;

  const { main, icon } = data.weather[0];

  const nightIcon = ["01n", "02n", "03n", "04n"];

  const { moon, sun, clouds, snow, rain, thunderstorm, mists } =
    animationsBlock;

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
    return moon;
  } else if (atmosphereMain.includes(main)) {
    return mists;
  } else {
    switch (main) {
      case "Clear":
        return sun;
      case "Clouds":
        return clouds;
      case "Snow":
        return snow;
      case "Rain":
        return rain;
      case "Thunderstorm":
        return thunderstorm;
      case "Drizzle":
        return rain;
      default:
        return clouds;
    }
  }
};

const CurrentTemperature = () => {
  const contextData = useContext(Context);
  return (
    <Temperature value={contextData}>
      <IconGenerator value={contextData}></IconGenerator>
    </Temperature>
  );
};

export default CurrentTemperature;
