import React from "react";
import { useSelector } from "react-redux";
import { Cloudy } from "../../helpers/animationsBlocks"; // Импорт анимации для облачной погоды
import _ from "lodash"; // Импорт библиотеки lodash для генерации уникальных ключей
import "./todayTemp.css"; // Импорт стилей для компонента

const TodayTemp = () => {
  const { futureData } = useSelector((state) => state.weatherData); // Получение данных о будущей погоде из состояния Redux

  // Проверка, есть ли данные о будущей погоде
  if (futureData.list.length !== 0) {
    return (
      <div className="main-container">
        {/* Заголовок с информацией о текущем времени и дате */}
        <div className="today-header">
          <h4 className="today-weather_head">3 часа</h4>
          <p className="today-weather_date">
            {/* Отображение даты в формате "месяц, день" */}
            {new Date(futureData.list[0].dt * 1000).toLocaleString("ru", {
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        {/* Контейнер для отображения данных о погоде на ближайшие 4 часа */}
        <div className="hours-container">
          {/* Маппинг данных для каждого временного интервала */}
          {futureData.list.slice(0, 4).map((item) => {
            const { icon } = item.weather[0]; // Извлечение иконки погоды
            const iconUrl = `${"weather/"}${icon}.png`; // Формирование URL для иконки
            const normalizeTemp = Math.ceil(item.main.temp); // Округление температуры до ближайшего целого
            const normalizeTime = new Date(item.dt_txt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }); // Преобразование времени в формат "час:минута"

            return (
              <div
                key={_.uniqueId("time-container-")} // Генерация уникального ключа с помощью lodash
                className="first-hours time-container" // Класс для стилизации элемента
              >
                {/* Блок для отображения температуры */}
                <div className="hour-temp_block">
                  <p className="hours-temp">
                    {/* Отображение температуры и значка градуса */}
                    {normalizeTemp ? normalizeTemp : null}
                    <span className="gradus">°</span>
                  </p>
                </div>
                {/* Блок для отображения иконки погоды */}
                <div className="card-image_block">
                  <img className="card-image" src={iconUrl} alt={icon} />
                </div>
                {/* Блок для отображения времени */}
                <div className="hours-time_block">
                  <p className="hours-time">
                    {/* Отображение времени */}
                    {normalizeTime ? normalizeTime : null}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    // Если данных о погоде нет, отображается анимация облачной погоды
    return <Cloudy />;
  }
};

export default TodayTemp;
