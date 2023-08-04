import React, { useContext, useMemo } from "react";
import { Context } from "../context/context";
import cn from "classnames";
import _ from "lodash";

const Forecast = () => {
  const contextData = useContext(Context);

  const { futureData } = contextData.state;

  const { list } = futureData;

  const { unit, forecastTime, theme } = contextData.state;

  const memoization = useMemo(() => {
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
                "bg-info": normalizeTempMax <= 10 ? true : false,
                "bg-success": normalizeTempMax < 20 ? true : false,
                "bg-warning": normalizeTempMax >= 20 ? true : false,
                "bg-danger": normalizeTempMax >= 30 ? true : false,
              })
            : cn({
                "progress-bar": true,
                "progress-bar-striped": true,
                "progress-bar-animated": true,
                "bg-info": normalizeTempMax <= 50 ? true : false,
                "bg-success": normalizeTempMax <= 59 ? true : false,
                "bg-warning": normalizeTempMax >= 68 ? true : false,
                "bg-danger": normalizeTempMax >= 86 ? true : false,
              });

        const fahrenheitToCelsius = ((normalizeTempMax - 32) * 5) / 9;

        const progressStyles =
          unit === "metric" ? normalizeTempMax * 3 : fahrenheitToCelsius * 3;

        return (
          <label key={_.uniqueId("forecast-")} className="label-card">
            <input className="check_card" type="checkbox"></input>
            <div id={index} className="forecast-card">
              <div className="front">
                <p className="forecast-data">
                  {currentDay ? currentDay : null}
                </p>
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
          </label>
        );
      } else {
        return null;
      }
    });
  }, [forecastTime, list, theme, unit]);
  return memoization;
};

export default Forecast;
