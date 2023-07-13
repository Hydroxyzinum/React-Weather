import React, { useContext } from "react";
import { Context } from "../context";

const MainData = ({ value }) => {
  const { data } = value;

  const { main, clouds, wind } = data;

  const { humidity } = main;

  const { all } = clouds;

  const { speed } = wind;

  return (
    <div className="weather-main_data">
      <div className="main-data">
        <div className="data-container">
          <img className="humidity-img" src="weather/humidity.png" alt="#" />
          <p className="humidity m-0">{humidity ? humidity : 0}%</p>
        </div>
        <div className="data-container">
          <img className="data-image" src="weather/03d.png" alt="#" />
          <p className="clouds m-0">{all ? all : 0}%</p>
        </div>
        <div className="data-container">
          <img className="data-image" src="weather/wind.png" alt="wind" />
          <p className="wind m-0">{speed ? Math.ceil(speed) : 0} км/ч</p>
        </div>
      </div>
    </div>
  );
};

const Main = () => {
  const contextData = useContext(Context);
  return <MainData value={contextData}></MainData>;
};

export default Main;
