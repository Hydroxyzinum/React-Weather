import React from "react";
import { useSelector } from "react-redux"; // Импорт хука useSelector из библиотеки react-redux
import cn from "classnames"; // Импорт библиотеки classnames для работы с CSS классами
import './parent.css'; // Импорт стилей для компонента

const Parent = ({ children }) => {
  const { theme, rightMenu, settingsMenu } = useSelector((state) => state.ui); // Получение данных из состояния Redux с помощью useSelector

  const display = cn({
    container: true,
    "container-overflow": !rightMenu || !settingsMenu, // Добавление класса container-overflow в зависимости от состояния меню
    "container-overflow_hidden": rightMenu || settingsMenu, // Добавление класса container-overflow_hidden в зависимости от состояния меню
  });

  return (
    <div className="App"> {/* Корневой контейнер */}
      <div style={theme} className={display}>
        {children} {/* Рендеринг дочерних компонентов */}
      </div>
    </div>
  );
};

export default Parent;
