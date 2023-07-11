import React, { useContext } from "react";
import backgroundColor from "./bgColors";
import { Context } from "./context";

const setBack = (props) => {
  if (Object.keys(props).length === 0) {
    return null;
  } else {
    const { day, evening, night } = backgroundColor;
    const { formatted } = props;
    const normalizeHour = Number(formatted.slice(11, 13));
    const timesOfDay = {
      dayTime: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      eveningTime: [16, 17, 18, 19, 20, 21],
      nightTime: [22, 23, 0, 1, 2, 3, 4, 5],
    };
    const { dayTime, eveningTime, nightTime } = timesOfDay;

    if (dayTime.includes(normalizeHour)) {
      return day;
    }
    if (eveningTime.includes(normalizeHour)) {
      return evening;
    }
    if (nightTime.includes(normalizeHour)) {
      return night;
    }
  }
};

const ChooseParent = ({ children, value }) => {
  const { data, time } = value;

  if (data.length !== 0) {
    return (
      <div className="App">
        <div style={setBack(time)} className="container">
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
  const { data, time } = useContext(Context);
  return <ChooseParent value={{ time, data }}>{children}</ChooseParent>;
};

export default Parent;
