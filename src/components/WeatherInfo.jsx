import React, { useContext } from "react";
import { Context } from "../context";

const Info = ({ value }) => {
  const { data } = value;
  const { lon, lat } = data.coord;
  const hrefGeo = `https://www.google.com/maps/place/55%C2%B047'19.3%22N+49%C2%B007'19.6%22E/@${lat},${lon},12z/data=!4m4!3m3!8m2!3d55.7887!4d49.1221?hl=ru-RU&entry=ttu`;
  return (
    <div className="footer-info">
      <p className="footer-weather_data">
        Данные о погоде предоставлены:{" "}
        <a target="_blank" rel="noreferrer" href="https://openweathermap.org/">
          Openweathermap
        </a>
      </p>
      <p className="footer-time_data">
        Данные о времени предоставлены:{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://app.ipgeolocation.io/"
        >
          Ipgeolocation
        </a>
      </p>
      <p className="footer-geo">
        Ваши геоданные на карте (примерные): <br></br>{" "}
        <a target="_blank" rel="noreferrer" href={hrefGeo}>
          {lat}, {lon}
        </a>
      </p>
    </div>
  );
};

const WeatherInfo = () => {
  const contextData = useContext(Context);
  return <Info value={contextData}></Info>;
};

export default WeatherInfo;
