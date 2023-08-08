import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";

const Parent = ({ children }) => {
  const { theme, rightMenu, settingsMenu } = useSelector((state) => state.ui);

  const display = cn({
    container: true,
    "container-overflow": !rightMenu || !settingsMenu,
    "container-overflow_hidden": rightMenu || settingsMenu,
  });

  return (
    <div className="App">
      <div style={theme} className={display}>
        {children}
      </div>
    </div>
  );
};

export default Parent;
