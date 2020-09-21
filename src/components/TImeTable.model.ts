import { curry, head, pipe, last, propEq } from "ramda";
import {
  prettyTime,
  print12DigitsShortTime,
  PrintTimeFuntion
} from "../utils/date.helper";

// #region types
export type OpenCloseTime = {
  type: "close" | "open";
  value: number;
};

type DayOfWeek =
  | "monday"
  | "tuseday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface IWeeklyTimeTable {
  monday: OpenCloseTime[];
  tuseday: OpenCloseTime[];
  wednesday: OpenCloseTime[];
  thursday: OpenCloseTime[];
  friday: OpenCloseTime[];
  saturday: OpenCloseTime[];
  sunday: OpenCloseTime[];
  // TODO: how to optimize this with DayOfWeek
}

// #endregion

// #region default data & const

const defTimeTable: IWeeklyTimeTable = {
  monday: [],
  tuseday: [
    { type: "open", value: 36000 },
    { type: "close", value: 64800 }
  ],
  wednesday: [],
  thursday: [
    { type: "open", value: 36000 },
    { type: "close", value: 64800 }
  ],
  friday: [{ type: "open", value: 36000 }],
  saturday: [
    { type: "close", value: 3600 },
    { type: "open", value: 36000 }
  ],
  sunday: [
    { type: "close", value: 3600 },
    { type: "open", value: 43200 },
    { type: "close", value: 75600 }
  ]
};

export const getTimeTable = () => defTimeTable;

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
