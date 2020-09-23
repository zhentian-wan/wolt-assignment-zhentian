import { head, pipe, last, propEq, toPairs, map, join, groupWith } from "ramda";
import {
  prettyTime,
  print12DigitsShortTime,
  PrintTimeFuntion
} from "../utils/date.helper";
import { OpenCloseTime } from "../models";

// #region busniess utils
export const isType = propEq("type");
export const isTypeOpen = isType("open");
export const isTypeClose = isType("close");
export const isNotOperating = (times: OpenCloseTime[] = []) =>
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
export const printTimePeriodInPair = (day: OpenCloseTime[]) =>
  join(
    " - ",
    map(({ value }) => printTime(value), day)
  );
export const printListOpenCloseTimeInPair = (times: OpenCloseTime[]) =>
  pipe(groupWithOpenCloseTimeInPair, map(printTimePeriodInPair))(times);
export const printTime = (time: number, printTimeFn?: PrintTimeFuntion) =>
  prettyTime(time, printTimeFn || print12DigitsShortTime);
export const transform = (_data) => {
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

// #endregion
