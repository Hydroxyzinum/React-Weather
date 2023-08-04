import React, { useContext } from "react";
import { Context } from "../context/context";
import Icon from "./IconGenerator";

// Компонент для отображения текущей температуры и описания погоды
const Temperature = React.memo(({ children, value }) => {
  // Извлекаем данные о текущей погоде из контекста
  const { data } = value.state ? value.state : value.localState;

  const { name } = data;

  const { temp, temp_max, temp_min, feels_like } = data.main;

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
});

const CurrentTemperature = () => {
  // Извлекаем данные из контекста
  const contextData = useContext(Context);
  return (
    // Оборачиваем компоненты Temperature и IconGenerator в провайдер контекста, чтобы предоставить доступ к данным всему дереву компонентов
    <Temperature value={contextData}>
      <Icon value={contextData} />
    </Temperature>
  );
};

export default CurrentTemperature;
