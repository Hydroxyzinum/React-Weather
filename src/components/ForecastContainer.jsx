import React, { useContext } from "react";
import { Context } from "../context/context";

const ForecastContainer = ({ children }) => {
  const contextData = useContext(Context);
  const { forecastTime } = contextData.state
    ? contextData.state
    : contextData.localState;

  const { dispatch } = contextData;

  // Обработчик изменения значения в селекторе прогноза времени
  const submitForm = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_FORECAST_TIME", payload: e.target.value });
  };

  return (
    <div className="forecast-container">
      <div className="forecast-header">
        <div className="forecast-head-container">
          <h4 className="forecast-head">5 Дней</h4>
        </div>
        <div className="select-container">
          {/* Селектор для выбора прогноза времени */}
          <select
            className="select-time"
            value={forecastTime}
            onChange={submitForm}
            name="time"
          >
            <option className="option-style" value={9}>
              09:00
            </option>
            <option className="option-style" value={12}>
              12:00
            </option>
            <option className="option-style" value={15}>
              15:00
            </option>
            <option className="option-style" value={18}>
              18:00
            </option>
            <option className="option-style" value={21}>
              21:00
            </option>
          </select>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ForecastContainer;
