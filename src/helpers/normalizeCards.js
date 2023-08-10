export const normalizeCards = (pressure, visibility, rain, snow, deg, gust) => {
  return {
    normalizePressure: pressure
      ? `${Math.ceil(pressure / 1.333)} мм рт. ст.`
      : "0 мм рт. ст.",
    normalizeVisibility:
      visibility > 9999
        ? ">10 км."
        : `${String(visibility).slice(0, 2).split("").join(",")} км.`,
    normalizeDeg: deg ? `${Math.round(deg)}°` : "0°",
    normalizeGust: gust ? `${gust} м/с` : "0 м/с.",
    normalizeRain: rain ? `${rain["1h"]} мм.` : "0 мм.",
    normalizeSnow: snow ? `${snow["1h"]} мм.` : "0 мм.",
  };
};

export const cardsData = (
  normalizePressure,
  normalizeVisibility,
  normalizeDeg,
  normalizeGust,
  normalizeRain,
  normalizeSnow
) => {
  return [
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
};
