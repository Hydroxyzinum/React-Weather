import React, { useContext } from "react";
import { Context } from "../context";
import _ from "lodash";

const DescContainer = ({ children }) => {
  return <div className="decription-container">{children}</div>;
};

const DescData = ({ value }) => {
  const { data } = value;

  const { pressure } = data.main;

  const { visibility, rain, snow } = data;

  const { deg, gust } = data.wind;

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

  const mapObj = {
    infoArr: [
      normalizePressure,
      normalizeVisibility,
      normalizeDeg,
      normalizeGust,
      normalizeRain,
      normalizeSnow,
    ],
    namesArr: [
      "Атм. давление",
      "Видимость",
      "Напр. ветра",
      "Порывы ветра",
      "Дождь (1ч)",
      "Cнег (1ч)",
    ],
    photoUrls: [
      "cards/barometr.png",
      "cards/visibility.png",
      "cards/wind-deg.png",
      "cards/wind.png",
      "cards/rain.png",
      "cards/snow.png",
    ],
  };

  const { infoArr, namesArr, photoUrls } = mapObj;

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

const Desc = () => {
  const contextData = useContext(Context);
  return (
    <DescContainer>
      <DescData value={contextData}></DescData>
    </DescContainer>
  );
};

export default Desc;
