import React, { useContext } from "react";

import { Context } from "./context";

const ChooseParent = ({ children, value }) => {
  const { data, theme } = value;
  if (data.length !== 0) {
    return (
      <div className="App">
        <div style={theme} className="container">
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
