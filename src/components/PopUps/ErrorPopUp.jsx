import React from "react";
import { Thunderstorm } from "../../helpers/animationsBlocks";

const ErrorPopUp = ({ error }) => {
  return (
    <div className="err-container">
      <Thunderstorm />
      <h3 className="err-head">Извините, что-то пошло не так :(</h3>
      <p className="err-text">Ошибка: {error}</p>
    </div>
  );
};

export default ErrorPopUp;
