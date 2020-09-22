import { head, pipe, last, propEq } from "ramda";
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
export const isCloseOnSameDay = (
  today: OpenCloseTime[],
  nextDay: OpenCloseTime[]
) => {
  const closeToday = pipe(last, isTypeClose)(today);
  if (closeToday) {
    return true;
  }
  const closeOnNextDay = pipe(head, isTypeClose)(nextDay);
  return !closeOnNextDay;
};

export const printTime = (time: number, printTimeFn?: PrintTimeFuntion) =>
  prettyTime(time, printTimeFn || print12DigitsShortTime);
// #endregion
