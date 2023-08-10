import React from "react";
import { useSelector } from "react-redux";
import "../Footer/footer.css"; // Импорт стилей для компонента Footer

const Footer = ({ children }) => {
  // Получение данных о погоде из состояния Redux
  const { data } = useSelector((state) => state.weatherData);

  // Извлечение широты и долготы из данных о погоде
  const { lon, lat } = data.coord;

  // URL-адреса для ссылок на сторонние сервисы
  const openWeatherMapUrl = "https://openweathermap.org/";
  const ipGeoLocationUrl = "https://app.ipgeolocation.io/";
  const googleMapsUrl = `https://www.google.com/maps/@${lat},${lon},12z?hl=ru-RU&entry=ttu`;
  // Отображение информации о погоде и геоданных
  return (
    <div className="footer-info"> {/* Контейнер для всей информации в футере */}
      {/* Ссылка на Openweathermap */}
      <p className="footer-weather_data">
        Данные о погоде предоставлены:{" "}
        <a target="_blank" rel="noreferrer" href={openWeatherMapUrl}>
          Openweathermap
        </a>
      </p>
      {/* Ссылка на Ipgeolocation */}
      <p className="footer-time_data">
        Данные о времени предоставлены:{" "}
        <a target="_blank" rel="noreferrer" href={ipGeoLocationUrl}>
          Ipgeolocation
        </a>
      </p>
      {/* Ссылка на Google Maps с отображением координат */}
      <p className="footer-geo">
        Геоданные на карте (примерные): <br />{" "}
        <a target="_blank" rel="noreferrer" href={googleMapsUrl}>
          {lat}, {lon}
        </a>
      </p>
      {children} {/* Вставка дочерних компонентов */}
    </div>
  );
};

export default Footer;