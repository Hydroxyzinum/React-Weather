export const backgroundColor = {
  day: {
    background:
      "linear-gradient(140deg, #47BBE1 0%, #33AADD 50%, #2DC8EA 100%)",
  },
  evening: {
    background:
      "linear-gradient(140deg, #08244F 0%, #134CB5 50%, #0B42AB 100%)",
  },
  night: {
    background:
      "linear-gradient(140deg, #254659 0%, #023553 50%, #254659 100%)",
  },
};

export const setBackground = (time, setTheme) => {
  if (!Object.keys(time).length) {
    return null;
  } else {
    const { day, evening, night } = backgroundColor;
    const { date_time } = time;
    const normalizeHour = Number(date_time.slice(11, 13));
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
