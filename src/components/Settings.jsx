import React from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { backgroundColor, setBackground } from "../helpers/bgColors";
import { setLocation } from "../store/locationSlice";
import { setSearchEngine } from "../store/searchEngineSlice";
import {
  setUnit,
  setTheme,
  setSettingsMenu,
  setUnitCheckBox,
  setSettingsTheme,
} from "../store/uiSlice";
import { russia } from "../helpers/russia";
import cn from "classnames";
import RenderSettingsItem from "./RenderSettingsItem";

const Settings = () => {
  const dispatch = useDispatch();

  const { theme, settingsMenu, unitCheckbox, settingsTheme } = useSelector(
    (state) => state.ui
  );

  const { location } = useSelector((state) => state.location);

  const searchChange = (e) => {
    e.preventDefault();

    const { value } = e.target;

    if (!value) {
      batch(() => {
        dispatch(setSearchEngine([]));
        dispatch(setLocation(""));
      });
      return null;
    } else {
      dispatch(setLocation(value));
      const result = russia.filter(({ city }) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      dispatch(setSearchEngine(result));
    }
  };

  const settingsClassname = cn({
    "settings-container": true,
    "settings-show": settingsMenu,
  });

  const sliderClasses = cn({
    "slider-themes": true,
    day: localStorage.getItem("theme") === "day" || settingsTheme === "day",
    evening:
      localStorage.getItem("theme") === "evening" ||
      settingsTheme === "evening",
    night:
      localStorage.getItem("theme") === "night" || settingsTheme === "night",
    default:
      localStorage.getItem("theme") === "default" ||
      settingsTheme === "default",
  });

  return (
    <div
      onClick={() => {
        batch(() => {
          dispatch(setSearchEngine([]));
          dispatch(setLocation(""));
        });
      }}
      className={settingsClassname}
    >
      <div className="settings-exit-btn">
        <button
          onClick={() => dispatch(setSettingsMenu(false))}
          className="click-exit"
        >
          <span className="exit-line exit-first_line"></span>
          <span className="exit-line exit-second_line"></span>
        </button>
      </div>
      <div className="set-container">
        <p className="set-text">Единицы измерения</p>
        <label className="switch">
          <input
            type="checkbox"
            onClick={(e) =>
              e.target.checked
                ? dispatch(setUnit("imperial")) &&
                  localStorage.setItem("unit", "imperial")
                : dispatch(setUnit("metric")) &&
                  localStorage.setItem("unit", "metric")
            }
            onChange={() => dispatch(setUnitCheckBox(!unitCheckbox))}
            checked={localStorage.getItem("unit") === "imperial" ? true : false}
          />
          <span className="slider round"></span>
          <span className="farenheit">F°</span>
          <span className="celsium">C°</span>
        </label>
      </div>
      <div className="set-container">
        <p className="set-text">Стандартная тема</p>
        <div className="select-theme">
          <div className={sliderClasses}></div>
          <div
            onClick={() => {
              batch(() => {
                dispatch(setSettingsTheme("day"));
                dispatch(setTheme(backgroundColor.day));
              });

              localStorage.setItem("theme", "day");
            }}
            className="select-theme_item"
          >
            <img className="settings-img" src={"./weather/day.png"} alt="day" />
          </div>
          <div
            onClick={() => {
              batch(() => {
                dispatch(setSettingsTheme("evening"));
                dispatch(setTheme(backgroundColor.evening));
              });

              localStorage.setItem("theme", "evening");
            }}
            className="select-theme_item"
          >
            <img
              className="settings-img"
              src={"./weather/evening.png"}
              alt="evening"
            />
          </div>
          <div
            onClick={() => {
              batch(() => {
                dispatch(setSettingsTheme("night"));
                dispatch(setTheme(backgroundColor.night));
              });
              localStorage.setItem("theme", "night");
            }}
            className="select-theme_item"
          >
            <img
              className="settings-img"
              src={"./weather/night.png"}
              alt="night"
            />
          </div>
          <div
            onClick={() => {
              dispatch(setSettingsTheme("default"));
              localStorage.setItem("theme", "default");
            }}
            className="select-theme_item"
          >
            <div className="select-animated_container">
              <div className="animated-image_container">
                <img
                  className="settings-animated_img_f"
                  src={"./weather/day.png"}
                  alt="day"
                />
              </div>
              <div className="animated-image_container">
                <img
                  className="settings-animated_img_s"
                  src={"./weather/night.png"}
                  alt="night"
                />
              </div>
              <div className="animated-image_container">
                <img
                  className="settings-animated_img_t"
                  src={"./weather/evening.png"}
                  alt="evening"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="set-container">
        <p className="set-text">Локация по умолчанию</p>
        <label htmlFor="settings-search"></label>
        <input
          id="settings-search"
          className="settings-search"
          type="text"
          value={location}
          onChange={searchChange}
          placeholder={localStorage.getItem("default") ?? "Ваш город"}
        />
        <div className="searched-container">
          <div>
            <RenderSettingsItem />
          </div>
        </div>
      </div>
      <div className="set-container">
        <button onClick={() => localStorage.clear()} className="clear-cache">
          Очистить кеш
        </button>
      </div>
    </div>
  );
};

export default Settings;
