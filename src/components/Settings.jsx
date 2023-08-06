import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { backgroundColor, setBackground } from "../helpers/bgColors";
import { setUnit, setSettingsMenu, setUnitCheckBox } from "../store/uiSlice";
import cn from "classnames";

const Settings = () => {
  const dispatch = useDispatch();

  const { settingsMenu, unitCheckbox } = useSelector((state) => state.ui);

  const settingsClassname = cn({
    "settings-container": true,
    "settings-show": settingsMenu,
  });

  return (
    <div className={settingsClassname}>
      <div className="settings-exit-btn">
        <button
          onClick={() => dispatch(setSettingsMenu(false))}
          className="settings-exit-btn"
        >
          x
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
      </div>
      <div className="set-container">
        <p className="set-text">Локация по умолчанию</p>
      </div>
      <div className="set-container">
        <p className="set-text">Очистить кеш</p>
        <button onClick={() => localStorage.clear()} className="clear-cache">
          X
        </button>
      </div>
    </div>
  );
};

export default Settings;
