import React, { useContext } from "react";
import cn from "classnames";
import { Context } from "../context";
import animationsBlock from "../animationsBlocks";

const ChooseParent = ({ children, value }) => {
  const { data, theme, rightMenu } = value;

  const { clouds } = animationsBlock;

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
    return clouds;
  }
};

const Parent = ({ children }) => {
  const contextData = useContext(Context);
  return <ChooseParent value={contextData}>{children}</ChooseParent>;
};

export default Parent;
