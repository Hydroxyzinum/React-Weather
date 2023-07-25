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

    switch (true) {
      case [6, 7, 8, 9, 10, 11, 12, 13, 14, 15].includes(normalizeHour):
        return setTheme(day);
      case [16, 17, 18, 19, 20, 21].includes(normalizeHour):
        return setTheme(evening);
      default:
        return setTheme(night);
    }
  }
};
