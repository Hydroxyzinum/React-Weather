import React, { useContext } from "react";
import { Context } from "./context";

const Temperature = ({ children, value }) => {
  const { name } = value;

  const { temp, temp_max, temp_min, feels_like } = value.main;

  const { description } = value.weather[0];

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
      <p className="description">{normalizeDesc}</p>
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
  const { main, icon } = value.weather[0];
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
    return (
      <div icon="supermoon">
        <span className="moon"></span>
        <span className="meteor"></span>
      </div>
    );
  }
  if (atmosphereMain.includes(main)) {
    return (
      <div icon="mists">
        <div className="mist-block">
          <span className="mist"></span>
          <span className="s-mist"></span>
          <span className="t-mist"></span>
        </div>
      </div>
    );
  } else {
    switch (main) {
      case "Clear":
        return (
          <div icon="sunny">
            <span className="sun"></span>
          </div>
        );
      case "Clouds":
        return (
          <div icon="cloudy">
            <span className="cloud"></span>
            <span className="cloud"></span>
          </div>
        );
      case "Snow":
        return (
          <div icon="snowy">
            <span className="snowman"></span>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        );
      case "Rain":
        return (
          <div icon="stormy">
            <span className="cloud"></span>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        );
      case "Thunderstorm":
        return (
          <div icon="thunderstorm">
            <span className="cloud"></span>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        );
      case "Drizzle":
        return (
          <div icon="stormy">
            <span className="cloud"></span>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        );
      default:
        return (
          <div icon="cloudy">
            <span className="cloud"></span>
            <span className="cloud"></span>
          </div>
        );
    }
  }
};

const CurrentTemperature = () => {
  const contextData = useContext(Context);
  const { data } = contextData;
  return (
    <Temperature value={data}>
      <IconGenerator value={data}></IconGenerator>
    </Temperature>
  );
};

export default CurrentTemperature;
