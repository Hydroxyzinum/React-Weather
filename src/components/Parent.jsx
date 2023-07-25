import React, { useContext } from "react";
import cn from "classnames";
import { Context } from "../context/context";
import animationsBlock from "../helpers/animationsBlocks";

// Компонент-контейнер для выбора отображения содержимого в зависимости от данных о погоде
const ChooseParent = ({ children, value }) => {
  const { state } = value;
  const { data, theme, rightMenu } = state;

  const { clouds } = animationsBlock;

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
    // Если данных о погоде нет, отображаем анимацию облаков
    return clouds;
  }
};

// Компонент, который использует ChooseParent и передает ему данные из контекста
const Parent = ({ children }) => {
  const contextData = useContext(Context);
  return <ChooseParent value={contextData}>{children}</ChooseParent>;
};

export default Parent;
