import React, { useContext } from "react";
import { Context } from "./context";
import _ from "lodash";

const CardContainer = ({ children }) => {
  return <div className="main-container">{children}</div>;
};

const FutureHours = ({ value }) => {
  const { dt } = value.data;
  const todayDate = new Date(dt * 1000);
  const day = todayDate.getDate();
  const monthRu = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const month = monthRu[todayDate.getMonth()];
  const resultDate = `${month}, ${day}`;
  return (
    <div className="today-header">
      <h4 className="today-weather_head">3 часа</h4>
      <p className="today-weather_date">{resultDate ? resultDate : null}</p>
    </div>
  );
};

const HourContainer = ({ children }) => {
  return <div className="hours-container">{children}</div>;
};

const Cards = ({ value }) => {
  const { futureData } = value;
  const future = futureData.list;
  if (future.length !== 0) {
    return future.map((item, index) => {
      const iconUrl = `${"weather/"}${item.weather[0].icon}.png`;

      const dateToStr = new Date(item.dt_txt);

      const normalizeTemp = Math.ceil(item.main.temp);

      const normalizeTime = `${dateToStr.getHours()}:00`;

      if (index < 4) {
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
              <img
                className="card-image"
                src={iconUrl}
                alt={`${item.weather[0].icon}`}
              />
            </div>
            <div className="hours-time_block">
              <p className="hours-time">
                {normalizeTime ? normalizeTime : null}
              </p>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
  } else {
    return (
      <div icon="cloudy" data-label="Секундочку...">
        <span className="cloud"></span>
        <span className="cloud"></span>
      </div>
    );
  }
};

const TodayTemp = () => {
  const contextData = useContext(Context);
  return (
    <CardContainer>
      <FutureHours value={contextData}></FutureHours>
      <HourContainer>
        <Cards value={contextData}></Cards>
      </HourContainer>
    </CardContainer>
  );
};

export default TodayTemp;
