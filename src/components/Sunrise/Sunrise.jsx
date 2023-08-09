import React from "react";
import { useSelector } from "react-redux";
import './sunrise.css'

const Sunrise = () => {
  // Получение данных о погоде из состояния Redux
  const { data } = useSelector((state) => state.weatherData);

  // Извлечение времени восхода и заката из объекта data
  const { sunrise, sunset } = data.sys;

  // Преобразование времени в удобный формат (часы:минуты) с использованием объекта Date
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
      {/* Компонента для отображения времени восхода */}
      <div className="sunrise">
        <p className="sunrise-text">Восход</p>
        <img className="sunrise-img" src="weather/sunrise.png" alt="" />
        <p className="sunrise-time">{sunriseTime}</p>
      </div>
      {/* Компонента для отображения времени заката */}
      <div className="sunset">
        <p className="sunrise-text">Закат</p>
        <img className="sunrise-img" src="weather/sunset.png" alt="" />
        <p className="sunrise-time">{sunsetTime}</p>
      </div>
    </div>
  );
};

export default Sunrise;
