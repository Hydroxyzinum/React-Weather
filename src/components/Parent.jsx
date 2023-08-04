import React, { useContext } from "react";
import cn from "classnames";
import { Context } from "../context/context";
import { Cloudy } from "../helpers/animationsBlocks";

// Компонент-контейнер для выбора отображения содержимого в зависимости от данных о погоде
const Parent = ({ children }) => {
  const contextData = useContext(Context);

  const { data, theme, rightMenu } = contextData.state
    ? contextData.state
    : contextData.localState;

  // Классы для стилизации контейнера в зависимости от состояния меню
  const display = cn({
    container: true,
    "container-overflow": !rightMenu,
    "container-overflow_hidden": rightMenu,
  });

  if (data.length !== 0) {
    // Если есть данные о погоде, отображаем содержимое компонента
    return (
      <div className="App">
        <div style={theme} className={display}>
          {children}
        </div>
      </div>
    );
  } else {
    return <Cloudy />;
  }
};

export default Parent;
