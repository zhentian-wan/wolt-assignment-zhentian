import { head, pipe, last, propEq, toPairs, map, join, groupWith } from "ramda";
import {
  prettyTime,
  print12DigitsShortTime,
  PrintTimeFuntion,
  getToday,
  WeekDayNumberMapping
} from "../utils/date.helper";
import { OpenCloseTime, IWeeklyTimeTable, WeeklyTimeTableVM } from "../models";

export const isType = propEq("type");
export const isTypeOpen = isType("open");
export const isTypeClose = isType("close");
export const isNotOperating = (times: OpenCloseTime[] | []) =>
  Array.isArray(times) && times.length === 0;
export const isCloseEndOfDay = pipe(last, isTypeClose);
export const isCloseHeadOfDay = pipe(head, isTypeClose);
export const isCloseOnSameDay = (
  today: OpenCloseTime[],
  nextDay: OpenCloseTime[]
) => {
  if (!today.length) {
    return true;
  }
  const closeToday = isCloseEndOfDay(today);
  if (closeToday) {
    return true;
  }
  const closeOnNextDay = isCloseHeadOfDay(nextDay);
  return !closeOnNextDay;
};

export const groupWithOpenCloseTimeInPair = (day: OpenCloseTime[]): boolean =>
  groupWith(
    (a: OpenCloseTime, b: OpenCloseTime) => isTypeOpen(a) && isTypeClose(b),
    day
  );
export const printTimePeriodInPair = (times: OpenCloseTime[]) =>
  join(
    " - ",
    map((time: OpenCloseTime) => printTime(time.value), times)
  );
export const printListOpenCloseTimeInPair = (times: OpenCloseTime[]) =>
  pipe(groupWithOpenCloseTimeInPair, map(printTimePeriodInPair))(times);

export const printTime = (time: number, printTimeFn?: PrintTimeFuntion) =>
  prettyTime(time, printTimeFn || print12DigitsShortTime);

export const transform = (_data: IWeeklyTimeTable): WeeklyTimeTableVM[] => {
  let res = [];
  let temp = null;
  let data = toPairs(_data);
  for (let i = 0; i < data.length; i++) {
    const today = data[i];
    temp = today;
    const nextDay = data[(i + 1) % 7];

    if (isNotOperating(temp[1])) {
      res.push(temp);
      continue;
    }

    if (!isCloseEndOfDay(temp[1])) {
      temp = [temp[0], [...temp[1], nextDay[1][0]]];
    }

    if (isCloseHeadOfDay(temp[1])) {
      temp = [temp[0], [...temp[1].slice(1)]];
    }

    res.push(temp);
  }

  return res;
};

const getTodayOpeningTime = (
  timeTable: WeeklyTimeTableVM[]
): WeeklyTimeTableVM => {
  const todayNum: number = getToday().getDay();
  const todayStr = WeekDayNumberMapping[`${todayNum}`];
  return timeTable.find((day) => day[0] === todayStr) as WeeklyTimeTableVM;
};
export const gerReadableAria = (timeTable: WeeklyTimeTableVM[]) => {
  const [dayName, openingHours] = getTodayOpeningTime(timeTable);
  const base = `Opening hours for today ${dayName}:`;
  if (isNotOperating(openingHours)) {
    return `${base} Today is closed`;
  }
  const todayOpenHoursStr = `${base} ${printListOpenCloseTimeInPair(
    openingHours
  )}`;
  return todayOpenHoursStr;
};
