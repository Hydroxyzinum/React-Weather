import React from "react";
import { useSelector } from "react-redux";
import '../Main/main.css'; // Импорт стилей для компонента

const Main = () => {
  const { data } = useSelector((state) => state.weatherData);

  const { main, clouds, wind } = data;

  const { humidity } = main; // Влажность

  const { all } = clouds; // Облачность
  
  const { speed } = wind; // Скорость ветра

  return (
    <div className="weather-main_data">
      <div className="main-data">
        <div className="data-container">
          {/* Иконка и текст для влажности */}
          <img
            className="humidity-img"
            src="weather/humidity.png"
            alt="humidity"
          />
          <p className="humidity m-0">{humidity ? humidity : 0}%</p>
        </div>
        <div className="data-container">
          {/* Иконка и текст для облачности */}
          <img className="cloudicon" src="weather/cloudicon.png" alt="clouds" />
          <p className="clouds m-0">{all ? all : 0}%</p>
        </div>
        <div className="data-container">
          {/* Иконка и текст для скорости ветра */}
          <img className="data-image" src="weather/wind.png" alt="wind" />
          <p className="wind m-0">{speed ? Math.ceil(speed) : 0} км/ч</p>
        </div>
      </div>
    </div>
  );
};

export default Main;