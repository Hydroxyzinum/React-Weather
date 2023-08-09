import React, { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import _ from "lodash";

const Forecast = () => {
  const { futureData } = useSelector((state) => state.weatherData);
  const { forecastTime, unit, theme } = useSelector((state) => state.ui);
  const [openCardIndex, setOpenCardIndex] = useState(null);

  const { list } = futureData;

  const handleCardClick = useCallback(
    (index) => {
      if (openCardIndex === index) {
        setOpenCardIndex(null);
      } else {
        setOpenCardIndex(index);
      }
    },
    [openCardIndex]
  );

  const forecastMemo = useMemo(() => {
    return list.map((item, index) => {
      const { dt_txt, clouds, main } = item;
      const { all } = clouds;
      const { temp_max, temp_min, humidity } = main;
      const averageTempAtNoon = new Date(dt_txt);
      const normalizeTempMax = Math.ceil(temp_max);
      const normalizeTempMin = Math.floor(temp_min);

      if (averageTempAtNoon.getHours() === Number(forecastTime)) {
        const { icon, description } = item.weather[0];
        const normalizeDesc = `${description[0].toUpperCase()}${description.slice(
          1
        )}`;
        const normalizeImgSrc = `${"weather/"}${icon}.png`;
        const currDate = new Date(item.dt_txt);
        const dayWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
        const currentDay = dayWeek[currDate.getDay()];

        const progressCn =
          unit === "metric"
            ? cn({
                "progress-bar": true,
                "progress-bar-striped": true,
                "progress-bar-animated": true,
                "bg-info": normalizeTempMax <= 10,
                "bg-success": normalizeTempMax < 20,
                "bg-warning": normalizeTempMax >= 20,
                "bg-danger": normalizeTempMax >= 30,
              })
            : cn({
                "progress-bar": true,
                "progress-bar-striped": true,
                "progress-bar-animated": true,
                "bg-info": normalizeTempMax <= 50,
                "bg-success": normalizeTempMax <= 59,
                "bg-warning": normalizeTempMax >= 68,
                "bg-danger": normalizeTempMax >= 86,
              });

        const fahrenheitToCelsius = ((normalizeTempMax - 32) * 5) / 9;
        const progressStyles =
          unit === "metric" ? normalizeTempMax * 3 : fahrenheitToCelsius * 3;

        const cardClasses = cn({
          "forecast-card": true,
          flipped: openCardIndex === index,
        });

        return (
          <div
            key={_.uniqueId("forecast-")}
            onClick={() => handleCardClick(index)}
            className={cardClasses}
          >
            <div className="front">
              <p className="forecast-data">{currentDay ? currentDay : null}</p>
              <img
                className="forecast-data_img"
                src={normalizeImgSrc}
                alt={icon}
              />
              <div className="progress">
                <div
                  className={progressCn}
                  style={{ width: `${progressStyles}%` }}
                  role="progressbar"
                  aria-valuenow={normalizeTempMax}
                  aria-valuemin="0"
                  aria-valuemax="40"
                ></div>
              </div>
              <p className="forecast-temp">
                {normalizeTempMax ? normalizeTempMax : null}°
              </p>
            </div>
            <div style={theme} className="back">
              <div className="back-time_container">
                <p className="back-time">
                  {normalizeDesc ? normalizeDesc : null}
                </p>
                <img className="back-img" src={normalizeImgSrc} alt={icon} />
              </div>
              <div className="back-weather_info">
                <div className="back-temp">
                  <span className="back-temp_min">
                    Макс.: {normalizeTempMax ? normalizeTempMax : null}°
                  </span>
                  <span className="back-temp_max">
                    Мин.: {normalizeTempMin ? normalizeTempMin : null}°
                  </span>
                </div>
                <div className="back-info">
                  <span className="back-clouds">
                    Облачность.: {all ? all : 0}%
                  </span>
                  <span className="back-humidity">
                    Влажность.: {humidity ? humidity : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
  }, [forecastTime, list, openCardIndex, theme, unit, handleCardClick]);
  return forecastMemo;
};

export default Forecast;
