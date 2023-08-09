import React from "react";
import { useSelector } from "react-redux";
import "../Footer/footer.css";

const Footer = ({ children }) => {
  const { data } = useSelector((state) => state.weatherData);

  const { lon, lat } = data.coord;

  const openWeatherMapUrl = "https://openweathermap.org/";
  const ipGeoLocationUrl = "https://app.ipgeolocation.io/";
  const googleMapsUrl = `https://www.google.com/maps/@${lat},${lon},12z?hl=ru-RU&entry=ttu`;

  return (
    <div className="footer-info">
      <p className="footer-weather_data">
        Данные о погоде предоставлены:{" "}
        <a target="_blank" rel="noreferrer" href={openWeatherMapUrl}>
          Openweathermap
        </a>
      </p>
      <p className="footer-time_data">
        Данные о времени предоставлены:{" "}
        <a target="_blank" rel="noreferrer" href={ipGeoLocationUrl}>
          Ipgeolocation
        </a>
      </p>
      <p className="footer-geo">
        Геоданные на карте (примерные): <br />{" "}
        <a target="_blank" rel="noreferrer" href={googleMapsUrl}>
          {lat}, {lon}
        </a>
      </p>
      {children}
    </div>
  );
};

export default Footer;
