import React from "react";
import { getLocation } from "../helpers/showPosition";
import { useSelector, useDispatch } from "react-redux";
import { setRightMenu, setSettingsMenu } from "../store/uiSlice";

const Header = () => {
  const dispatch = useDispatch();

  const { data, time } = useSelector((state) => state.weatherData);

  const { unit, fullLocation } = useSelector((state) => state.ui);
  
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
        <button onClick={() => dispatch(setSettingsMenu(true))} className="click-settings">НАСТРОЙКИ</button>
        <button
          onClick={() => dispatch(setRightMenu(true))}
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
