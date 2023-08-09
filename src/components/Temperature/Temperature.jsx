import React from "react";
import { useSelector } from "react-redux";
import "./tempertature.css";

// Компонент для отображения текущей температуры и описания погоды
const Temperature = React.memo(({ children }) => {
  // Получение данных о погоде из состояния Redux
  const { data } = useSelector((state) => state.weatherData);

  // Извлечение имени местоположения из объекта data
  const { name } = data;

  // Извлечение данных о температуре из объекта data.main
  const { temp, temp_max, temp_min, feels_like } = data.main;

  // Извлечение описания погоды из объекта data.weather
  const { description } = data.weather[0];

  // Нормализуем описание погоды, чтобы первая буква была заглавной
  const normalizeDesc =
    description.charAt(0).toUpperCase() + description.slice(1);

  // Нормализуем значения температуры, округляя их до ближайшего целого числа
  const normalizeData = {
    temperature: Math.floor(temp),
    temperatureMax: Math.ceil(temp_max),
    temperatureMin: Math.floor(temp_min),
    feelsLike: Math.floor(feels_like),
  };

  // Извлекаем нормализованные значения температуры из объекта normalizeData
  const { temperature, temperatureMax, temperatureMin, feelsLike } =
    normalizeData;

  return (
    <div className="weather-image_container">
      {/* Контейнер для дочерних компонентов, которые могут быть переданы */}
      <div className="image-container">{children}</div>
      {/* Отображение имени местоположения */}
      <h1 className="choose_city">{name ? name : null}</h1>
      {/* Отображение текущей температуры */}
      <h2 className="temperature">
        {temp ? temperature : null}
        <span className="gradus">°</span>
      </h2>
      {/* Отображение описания погоды */}
      <p className="description">{normalizeDesc ? normalizeDesc : null}</p>
      {/* Отображение минимальной и максимальной температуры */}
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
      {/* Отображение "ощущается как" температуры */}
      <div className="feels-like_container">
        <p className="feels-like">
          Ощущается как: {feels_like ? feelsLike : null}
          <span className="gradus">°</span>
        </p>
      </div>
    </div>
  );
});

export default Temperature;