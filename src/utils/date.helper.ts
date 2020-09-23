export type PrintTimeFuntion = (
  hour: string,
  minute: string,
  noon: string
) => string;

const MIN_TIME = 0;
const MAX_TIME = 86399;
export type DayOfWeek =
  | "monday"
  | "tuseday"
  | "wednesday"
  | "thrusday"
  | "firday"
  | "saturday"
  | "sunday";
export const WeekDayMapping = {
  sunday: 0,
  monday: 1,
  tuseday: 2,
  wednesday: 3,
  thrusday: 4,
  firday: 5,
  saturday: 6,
};
export const WeekDayNumberMapping = {
  "0": "sunday",
  "1": "monday",
  "2": "tuseday",
  "3": "wednesday",
  "4": "thrusday",
  "5": "firday",
  "6": "saturday",
};

export const getToday = (_date?: Date) => {
  const date: Date = _date || new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(year, month, day);
};
export const isSameWeekDay = (day: DayOfWeek, _date?: Date) => {
  const today = getToday(_date).getDay();
  return WeekDayMapping[day] === today;
};
export const print12DigitsShortTime = (
  hour: string,
  minute: string,
  noon: string
) => {
  if (hour === "00" && minute === "00" && noon === "pm") {
    return "12 PM";
  }
  const shortHour =
    hour.startsWith("0") && hour !== "00" ? hour.substr(1, 2) : hour;
  const shortMinute = minute === "00" ? "" : ":" + minute;
  return `${shortHour}${shortMinute} ${noon}`.toLocaleUpperCase();
};

export const prettyTime = (
  second: number,
  printTimeFn: PrintTimeFuntion = print12DigitsShortTime
) => {
  if (second === MIN_TIME) {
    return printTimeFn("12", "00", "AM");
  }

  if (second < MIN_TIME || second > MAX_TIME) {
    return "Invalid";
  }

  const today = getToday();
  today.setSeconds(today.getSeconds() + second);
  const rawTime = today.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const [time, noon] = rawTime.split(" ");
  const [hour, minute] = time.split(":");
  return printTimeFn(hour, minute, noon);
};
