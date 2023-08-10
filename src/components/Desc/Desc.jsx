import React from "react";
import { useSelector } from "react-redux";
import { normalizeCards, cardsData } from "../../helpers/normalizeCards";

const Desc = () => {
  // Получение данных о погоде из состояния Redux
  const { data } = useSelector((state) => state.weatherData);

  // Извлечение необходимых данных из объекта data для отображения в карточках
  const { pressure } = data.main;

  const { visibility, rain, snow } = data;
  
  const { deg, gust } = data.wind;

  // Нормализация данных для отображения в карточках
  const {
    normalizePressure,
    normalizeVisibility,
    normalizeDeg,
    normalizeGust,
    normalizeRain,
    normalizeSnow,
  } = normalizeCards(pressure, visibility, rain, snow, deg, gust);

  const cards = cardsData(
    normalizePressure,
    normalizeVisibility,
    normalizeDeg,
    normalizeGust,
    normalizeRain,
    normalizeSnow
  );

  // Отображение карточек с информацией о погоде
  return cards.map(({ name, info, photoUrl, alt }, index) => (
    <div key={index} className="desc-card">
      <p className="card-head">{name}</p>
      <img className="cards-image" src={photoUrl} alt={alt} />
      <p className="card-text">{info}</p>
    </div>
  ));
};

export default Desc;
