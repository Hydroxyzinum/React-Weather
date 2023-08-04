import React, { useContext } from "react";
import { Context } from "../context/context";
import { Cloudy } from "../helpers/animationsBlocks";
import _ from "lodash";

const TodayTemp = () => {
  const contextData = useContext(Context);
  // const { state } = contextData;

  const { futureData } = contextData.state
    ? contextData.state
    : contextData.localState;

  // Отображение информации о погоде на ближайшие 4 часа
  if (futureData.list.length !== 0) {
    return (
      <div className="main-container">
        {/* Заголовок с текущей датой */}
        <div className="today-header">
          <h4 className="today-weather_head">3 часа</h4>
          {/* Вывод текущей даты в формате "Месяц, День" */}
          <p className="today-weather_date">
            {new Date(futureData.list[0].dt * 1000).toLocaleString("ru", {
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        {/* Контейнер с карточками для каждого часа */}
        <div className="hours-container">
          {futureData.list.slice(0, 4).map((item) => {
            const { icon } = item.weather[0];
            const iconUrl = `${"weather/"}${icon}.png`;
            const normalizeTemp = Math.ceil(item.main.temp);
            const normalizeTime = new Date(item.dt_txt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={_.uniqueId("time-container-")}
                className="first-hours time-container"
              >
                <div className="hour-temp_block">
                  <p className="hours-temp">
                    {normalizeTemp ? normalizeTemp : null}
                    <span className="gradus">°</span>
                  </p>
                </div>
                <div className="card-image_block">
                  <img className="card-image" src={iconUrl} alt={icon} />
                </div>
                <div className="hours-time_block">
                  <p className="hours-time">
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
    // Если данные о погоде на ближайшие 4 часа отсутствуют, отображаем анимацию облаков
    return <Cloudy />;
  }
};

export default TodayTemp;
