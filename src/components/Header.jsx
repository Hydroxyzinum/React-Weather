import React, { useContext } from "react";
import { Context } from "../context/context";
import { getLocation } from "../helpers/showPosition";

// Функциональный компонент для отображения данных в шапке
const Header = () => {
  const contextData = useContext(Context);

  const { dispatch } = contextData;

  const { fullLocation, unit, data, time } = contextData.state
    ? contextData.state
    : contextData.localState;

  return (
    <div className="header">
      <div className="geo-container">
        <button
          onClick={() => getLocation(fullLocation, unit, dispatch)}
          type="button"
          className="geolocation"
        ></button>
        <p className="geoInfo">
          {data.name ? data.name : null}
          <br />
          <span className="geoTime">
            {time.time_24 ? time.time_24.slice(0, 5) : null}
          </span>
        </p>
      </div>
      <div className="search-container">
        <button
          onClick={() => dispatch({ type: "SET_RIGHT_MENU", payload: true })}
          className="click-field"
        >
          <span className="burger-line burger-first_line"></span>
          <span className="burger-line burger-second_line"></span>
          <span className="burger-line burger-third_line"></span>
        </button>
      </div>
    </div>
  );
};

export default Header;
