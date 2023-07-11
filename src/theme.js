import backgroundColor from "./bgColors";

export const setBackground = (time, setTheme) => {
  if (!Object.keys(time).length) {
    return null;
  } else {
    const { day, evening, night } = backgroundColor;
    const { formatted } = time;
    const normalizeHour = Number(formatted.slice(11, 13));
    const timesOfDay = {
      dayTime: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      eveningTime: [16, 17, 18, 19, 20, 21],
      nightTime: [22, 23, 0, 1, 2, 3, 4, 5],
    };
    const { dayTime, eveningTime } = timesOfDay;
    if (dayTime.includes(normalizeHour)) {
      return setTheme(day);
    } else if (eveningTime.includes(normalizeHour)) {
      return setTheme(evening);
    } else {
      return setTheme(night);
    }
  }
};
