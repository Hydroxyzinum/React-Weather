import React from "react";
import { setForecastTime } from "../../store/slices/uiSlice";
import { useSelector, useDispatch } from "react-redux";

const ForecastContainer = ({ children }) => {
  const dispatch = useDispatch();

  // Получение выбранного времени прогноза из состояния Redux
  const { forecastTime } = useSelector((state) => state.ui);

  // Обработчик изменения выбранного времени прогноза
  const submitForm = (e) => {
    e.preventDefault();
    // Диспатч экшена для установки нового времени прогноза
    dispatch(setForecastTime(e.target.value));
  };

  return (
    <div className="forecast-container">
      <div className="forecast-header">
        <div className="forecast-head-container">
          <h4 className="forecast-head">5 Дней</h4>
        </div>
        <div className="select-container">
          <select
            className="select-time"
            value={forecastTime}
            onChange={submitForm}
            name="time"
          >
            {/* Опции для выбора времени прогноза */}
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

