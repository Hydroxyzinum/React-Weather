import React, { useContext } from "react";
import animationsBlock from "../styles/animationsBlocks";
import { Context } from "../Context/context";

// Компонент для отображения текущей температуры и описания погоды
const Temperature = ({ children, value }) => {
  const { data } = value;

  // Извлекаем данные о названии города, температуре и описании погоды из объекта data
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
};

// Компонент для генерации иконки погоды на основе данных о погоде
const IconGenerator = ({ value }) => {
  const { data } = value;

  // Извлекаем данные о главной погодной категории (main) и иконке погоды (icon) из объекта data
  const { main, icon } = data.weather[0];

  // Массив иконок для ночного времени суток
  const nightIcon = ["01n", "02n", "03n", "04n"];

  // Загрузка соответствующих анимаций из animationsBlock в зависимости от категории погоды
  const { moon, sun, clouds, snow, rain, thunderstorm, mists } = animationsBlock;

  // Массив категорий атмосферных явлений
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

  // Возвращаем соответствующую анимацию в зависимости от значений main и icon
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

// Компонент для отображения текущей температуры и иконки погоды
const CurrentTemperature = () => {
  const contextData = useContext(Context);
  return (
    // Оборачиваем компоненты Temperature и IconGenerator в провайдер контекста, чтобы предоставить доступ к данным всему дереву компонентов
    <Temperature value={contextData}>
      <IconGenerator value={contextData}></IconGenerator>
    </Temperature>
  );
};

export default CurrentTemperature;