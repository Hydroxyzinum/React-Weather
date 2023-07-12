import React, { useContext } from "react";
import cn from "classnames";
import { Context } from "./context";

const ChooseParent = ({ children, value }) => {
  const { data, theme, rightMenu } = value;
  
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
    return (
      <div icon="cloudy" data-label="Секундочку...">
        <span className="cloud"></span>
        <span className="cloud"></span>
      </div>
    );
  }
};

const Parent = ({ children }) => {
  const contextData = useContext(Context);
  return <ChooseParent value={contextData}>{children}</ChooseParent>;
};

export default Parent;
