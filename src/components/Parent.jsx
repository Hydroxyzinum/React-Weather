import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import { Cloudy } from "../helpers/animationsBlocks";

const Parent = ({ children }) => {
  const { data } = useSelector((state) => state.weatherData);

  const { theme, rightMenu } = useSelector((state) => state.ui);

  const display = cn({
    container: true,
    "container-overflow": !rightMenu,
    "container-overflow_hidden": rightMenu,
  });

  if (data.length !== 0) {
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
