import React, { useContext } from "react";
import { Context } from "./context";
import cn from "classnames";

const CardContainer = ({ children }) => {
  return <div className="main-container">{children}</div>;
};

const FutureHours = ({ value }) => {
  const { dt } = value;
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
      <p className="today-weather_date">{resultDate}</p>
    </div>
  );
};

const HourContainer = ({ children }) => {
  return <div className="hours-container">{children}</div>;
};

const Cards = ({ value }) => {
  const future = value.list;
  if (future.length !== 0) {
    return future.map((item, index) => {
      const imgClasses = cn(["card-image", `weather-${item.weather[0].icon}`]);
      const dateToStr = new Date(item.dt_txt);
      if (index < 4) {
        return (
          <div key={index} className="first-hours time-container">
            <div className="hour-temp_block">
              <p className="hours-temp">
                {Math.round(item.main.temp)}
                <span className="gradus">°</span>
              </p>
            </div>
            <div className="card-image_block">
              <img
                className={imgClasses}
                src={`${"weather/"}${item.weather[0].icon}.png`}
                alt={`${item.weather[0].icon}`}
              />
            </div>
            <div className="hours-time_block">
              <p className="hours-time">{`${dateToStr.getHours()}:00`}</p>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
  } else {
    return <div className="">ПОДОЖДИТЕ.....</div>;
  }
};

const TodayTemp = () => {
  const { data, futureData } = useContext(Context);
  return (
    <CardContainer>
      <FutureHours value={data}></FutureHours>
      <HourContainer>
        <Cards value={futureData}></Cards>
      </HourContainer>
    </CardContainer>
  );
};

export default TodayTemp;
