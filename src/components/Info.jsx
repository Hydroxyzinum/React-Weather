import React, { useContext } from "react";
import { Context } from "../context/context";

const Info = () => {
  const contextData = useContext(Context);

  const { data } = contextData.state
    ? contextData.state
    : contextData.localState;

  const { lon, lat } = data.coord;

  const openWeatherMapUrl = "https://openweathermap.org/";
  const ipGeoLocationUrl = "https://app.ipgeolocation.io/";
  const googleMapsUrl = `https://www.google.com/maps/@${lat},${lon},12z?hl=ru-RU&entry=ttu`;

  return (
    <div className="footer-info">
      {/* Ссылка на источник данных о погоде */}
      <p className="footer-weather_data">
        Данные о погоде предоставлены:{" "}
        <a target="_blank" rel="noreferrer" href={openWeatherMapUrl}>
          Openweathermap
        </a>
      </p>
      {/* Ссылка на источник данных о времени */}
      <p className="footer-time_data">
        Данные о времени предоставлены:{" "}
        <a target="_blank" rel="noreferrer" href={ipGeoLocationUrl}>
          Ipgeolocation
        </a>
      </p>
      {/* Ссылка на карту с примерными геоданными */}
      <p className="footer-geo">
        Ваши геоданные на карте (примерные): <br />{" "}
        <a target="_blank" rel="noreferrer" href={googleMapsUrl}>
          {lat}, {lon}
        </a>
      </p>
    </div>
  );
};

export default Info;
