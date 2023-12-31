import React, { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import _ from "lodash";

const Forecast = () => {
  // Получение данных о прогнозе погоды из состояния Redux
  const { futureData } = useSelector((state) => state.weatherData);

  // Получение данных о времени прогноза, выбранной единицы измерения и темы из состояния Redux
  const { forecastTime, unit, theme } = useSelector((state) => state.ui);

  // Состояние для открытой карточки прогноза
  const [openCardIndex, setOpenCardIndex] = useState(null);

  // Извлечение списка прогнозов из данных о будущей погоде
  const { list } = futureData;

  // Обработчик клика по карточке прогноза
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

  // Создание мемоизированного массива компонентов прогноза погоды
  const forecastMemo = useMemo(() => {
    return list.map((item, index) => {
      // Извлечение данных о погоде из элемента списка прогноза
      const { dt_txt, clouds, main } = item;

      const { all } = clouds;

      const { temp_max, temp_min, humidity } = main;

      const averageTempAtNoon = new Date(dt_txt);
      const normalizeTempMax = Math.ceil(temp_max);
      const normalizeTempMin = Math.floor(temp_min);

      // Проверка, что время прогноза соответствует выбранному времени
      if (averageTempAtNoon.getHours() === Number(forecastTime)) {
        const { icon, description } = item.weather[0];
        
        const normalizeDesc = `${description[0].toUpperCase()}${description.slice(
          1
        )}`;

        const normalizeImgSrc = `${"weather/"}${icon}.png`;

        const currDate = new Date(item.dt_txt);

        const dayWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

        const currentDay = dayWeek[currDate.getDay()];

        // Создание классов для прогресс-бара в зависимости от единиц измерения
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

        // Преобразование температуры из Фаренгейта в Цельсии
        const fahrenheitToCelsius = ((normalizeTempMax - 32) * 5) / 9;

        // Вычисление стилей для прогресс-бара
        const progressStyles =
          unit === "metric" ? normalizeTempMax * 3 : fahrenheitToCelsius * 3;

        // Создание классов для карточки в зависимости от состояния открытия
        const cardClasses = cn({
          "forecast-card": true,
          flipped: openCardIndex === index,
        });

        // Возвращение компонента прогноза погоды
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
                    Облачность: {all ? all : 0}%
                  </span>
                  <span className="back-humidity">
                    Влажность: {humidity ? humidity : 0}%
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

  // Возвращение мемоизированного массива компонентов прогноза погоды
  return forecastMemo;
};

export default Forecast;
