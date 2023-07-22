import React, { useContext } from "react";
import { Context } from "../Context/context";
import _ from "lodash";

// Компонент для обертки карточек с дополнительной информацией о погоде
const DescContainer = ({ children }) => {
  return <div className="decription-container">{children}</div>;
};

// Компонент для отображения дополнительной информации о погоде
const DescData = ({ value }) => {
  const { data } = value;

  // Извлекаем данные о давлении, видимости, направлении и порывах ветра, а также о количестве дождя и снега из объекта data
  const { pressure } = data.main;
  const { visibility, rain, snow } = data;
  const { deg, gust } = data.wind;

  // Нормализуем значения для отображения на карточках
  const normalizePressure = pressure
    ? `${Math.ceil(pressure / 1.333)} мм рт. ст.`
    : "0 мм рт. ст.";
  const normalizeVisibility =
    visibility > 9999
      ? ">10 км."
      : `${String(value.visibility).slice(0, 2).split("").join(",")} км.`;
  const normalizeDeg = deg ? `${Math.round(deg)}°` : "0°";
  const normalizeGust = gust ? `${gust} м/с` : "0 м/с.";
  const normalizeRain = rain ? `${rain["1h"]} мм.` : "0 мм.";
  const normalizeSnow = snow ? `${snow["1h"]} мм.` : "0 мм.";

  // Массивы для хранения информации, названий и URL изображений для каждой карточки
  const infoArr = [
    normalizePressure,
    normalizeVisibility,
    normalizeDeg,
    normalizeGust,
    normalizeRain,
    normalizeSnow,
  ];
  const namesArr = [
    "Атм. давление",
    "Видимость",
    "Напр. ветра",
    "Порывы ветра",
    "Дождь (1ч)",
    "Cнег (1ч)",
  ];
  const photoUrls = [
    "cards/barometr.png",
    "cards/visibility.png",
    "cards/wind-deg.png",
    "cards/wind.png",
    "cards/rain.png",
    "cards/snow.png",
  ];

  // Генерируем карточки с информацией о погоде на основе данных из массивов
  return infoArr.map((info, index) => {
    return (
      <div key={_.uniqueId("card-")} className="desc-card">
        <p className="card-head">{namesArr[index]}</p>
        <img
          className="cards-image"
          src={photoUrls[index]}
          alt={photoUrls[index]}
        />
        <p className="card-text">{info}</p>
      </div>
    );
  });
};

// Компонент для отображения дополнительной информации о погоде
const Desc = () => {
  const contextData = useContext(Context);
  return (
    // Оборачиваем компонент DescData в контейнер DescContainer
    <DescContainer>
      <DescData value={contextData} />
    </DescContainer>
  );
};

export default Desc;