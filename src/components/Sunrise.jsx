import React, { useContext } from "react";
import { Context } from "../context/context";

const Sunrise = () => {
  const contextData = useContext(Context);
  return <RisingSun value={contextData}></RisingSun>;
};

// Компонент для отображения времени восхода и заката солнца
const RisingSun = ({ value }) => {
  const { data } = value.state ? value.state : value.localState;

  // Извлекаем время восхода и заката из данных о погоде
  const { sunrise, sunset } = data.sys;

  // Преобразуем время восхода и заката в формат 'HH:mm'
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
      {/* Отображаем время восхода */}
      <div className="sunrise">
        <p className="sunrise-text">Восход</p>
        <img className="sunrise-img" src="weather/sunrise.png" alt="" />
        <p className="sunrise-time">{sunriseTime}</p>
      </div>
      {/* Отображаем время заката */}
      <div className="sunset">
        <p className="sunrise-text">Закат</p>
        <img className="sunrise-img" src="weather/sunset.png" alt="" />
        <p className="sunrise-time">{sunsetTime}</p>
      </div>
    </div>
  );
};

export default Sunrise;
