import { head, pipe, last, propEq, toPairs, map, join, groupWith } from "ramda";
import {
  prettyTime,
  print12DigitsShortTime,
  getToday,
  WeekDayEnum,
} from "../utils/date.helper";
import {
  OpenCloseTime,
  IWeeklyTimeTable,
  WeeklyTimeTableVM,
  weeksNumber,
} from "../models";
import memoize from "../utils/memoize";

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
/* Re-arrange the data like such
[
  [{type: open}, {type: close}],
  [{type: open}, {type: close}]
]
*/
export const groupWithOpenCloseTimeInPair = groupWith(
  (a: OpenCloseTime, b: OpenCloseTime) => isTypeOpen(a) && isTypeClose(b)
);
// print opening hours 10 AM - 1 PM
export const printTimePeriodInPair = pipe(
  map((time: OpenCloseTime) => printTime(time.value)),
  join(" - ")
);
// print a list of opening hours
// 10 AM - 1 PM, 2 PM - 8 PM
export const printListOpenCloseTimeInPair = pipe(
  groupWithOpenCloseTimeInPair,
  map(printTimePeriodInPair)
);

// print time: "10 AM" using short 2 digits format
export const printTime = prettyTime(print12DigitsShortTime);

// transform the data from entities to array
// rearrange the data so that for the same day, it has all the information
// about open and close time
export const transform = memoize(
  (_data: IWeeklyTimeTable): WeeklyTimeTableVM[] => {
    let res = [];
    let temp = [];
    // from entities to array paris
    let data = toPairs(_data);
    // rearrange the array, so that for the same day has all the close and open time
    for (let i = 0; i < data.length; i++) {
      temp = data[i]; // temp: ['monday', [{}, {}]]
      const nextDay = data[(i + 1) % 7];

      if (isNotOperating(temp[1])) {
        res.push(temp);
        continue;
      }

      // if current day doesn't have last close time, then move
      // next day's first close time to the current day
      if (!isCloseEndOfDay(temp[1])) {
        temp = [temp[0], [...temp[1], nextDay[1][0]]] as WeeklyTimeTableVM;
      }

      // if current day's first item is close time, then remove
      // from the array
      if (isCloseHeadOfDay(temp[1] as OpenCloseTime[])) {
        temp = [
          temp[0],
          [...(temp[1].slice(1) as OpenCloseTime[])],
        ] as WeeklyTimeTableVM;
      }

      res.push(temp);
    }

    return res;
  }
);

// get today's opening hours
const getTodayOpeningTime = (
  timeTable: WeeklyTimeTableVM[]
): WeeklyTimeTableVM => {
  const todayNum = getToday().getDay() as weeksNumber;
  const todayStr = WeekDayEnum[todayNum];
  return timeTable.find((day) => day[0] === todayStr) as WeeklyTimeTableVM;
};
// get a readable aria-label information for screen reader
export const gerReadableAria = memoize((timeTable: WeeklyTimeTableVM[]) => {
  const [dayName, openingHours] = getTodayOpeningTime(timeTable);
  // if today is not operating
  const base = `Opening hours for today ${dayName}:`;
  if (isNotOperating(openingHours)) {
    return `${base} Today is closed`;
  }
  // print today opening hours information
  const todayOpenHoursStr = `${base} ${printListOpenCloseTimeInPair(
    openingHours
  )}`;
  return todayOpenHoursStr;
});
