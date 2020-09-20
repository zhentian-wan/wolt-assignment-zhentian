export type PrintTimeFuntion = (
  hour: string,
  minute: string,
  noon: string
) => string;

const MIN_TIME = 0;
const MAX_TIME = 86399;

export const getToday = (_date?: Date) => {
  const date: Date = _date || new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(year, month, day);
};

export const print12DigitsShortTime = (
  hour: string,
  minute: string,
  noon: string
) => {
  const shortHour = hour.startsWith("0") ? hour.substr(1, 2) : hour;
  const shortMinute = minute === "00" ? "" : ":" + minute;
  return `${shortHour}${shortMinute} ${noon}`.toLocaleUpperCase();
};

export const prettyTime = (
  second: number,
  printTimeFn: PrintTimeFuntion = print12DigitsShortTime
) => {
  if (second === MAX_TIME) {
    return printTimeFn("12", "00", "PM");
  }

  if (second === MIN_TIME) {
    return printTimeFn("00", "00", "AM");
  }

  if (second < MIN_TIME || second > MAX_TIME) {
    return "Invalid";
  }

  const today = getToday();
  today.setSeconds(today.getSeconds() + second);
  const rawTime = today.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  const [time, noon] = rawTime.split(" ");
  const [hour, minute] = time.split(":");
  return printTimeFn(hour, minute, noon);
};
