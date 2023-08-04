import React, { useContext } from "react";
import { Context } from "../context/context";

const Desc = () => {
  const contextData = useContext(Context);

  const { data } = contextData.state
    ? contextData.state
    : contextData.localState;

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
      : `${String(data.visibility).slice(0, 2).split("").join(",")} км.`;
  const normalizeDeg = deg ? `${Math.round(deg)}°` : "0°";

  const normalizeGust = gust ? `${gust} м/с` : "0 м/с.";

  const normalizeRain = rain ? `${rain["1h"]} мм.` : "0 мм.";

  const normalizeSnow = snow ? `${snow["1h"]} мм.` : "0 мм.";

  // Массивы для хранения информации, названий и URL изображений для каждой карточки
  const cardsData = [
    {
      name: "Атм. давление",
      info: normalizePressure,
      photoUrl: "cards/barometr.png",
      alt: "Атмосферное давление",
    },
    {
      name: "Видимость",
      info: normalizeVisibility,
      photoUrl: "cards/visibility.png",
      alt: "Видимость",
    },
    {
      name: "Напр. ветра",
      info: normalizeDeg,
      photoUrl: "cards/wind-deg.png",
      alt: "Направление ветра",
    },
    {
      name: "Порывы ветра",
      info: normalizeGust,
      photoUrl: "cards/wind.png",
      alt: "Порывы ветра",
    },
    {
      name: "Дождь (1ч)",
      info: normalizeRain,
      photoUrl: "cards/rain.png",
      alt: "Дождь",
    },
    {
      name: "Снег (1ч)",
      info: normalizeSnow,
      photoUrl: "cards/snow.png",
      alt: "Снег",
    },
  ];

  // Генерируем карточки с информацией о погоде на основе данных из массива объектов
  return cardsData.map(({ name, info, photoUrl, alt }, index) => (
    <div key={index} className="desc-card">
      <p className="card-head">{name}</p>
      <img className="cards-image" src={photoUrl} alt={alt} />
      <p className="card-text">{info}</p>
    </div>
  ));
};

export default Desc;
