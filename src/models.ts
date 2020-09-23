export type OpenCloseTime = {
  type: "close" | "open";
  value: number;
};

export type DayOfWeek =
  | "monday"
  | "tuseday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

// data model
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

// view model
export type WeeklyTimeTableVM = [string, IWeeklyTimeTable[]];

export type TimeTableComponentProps = { timeTable: WeeklyTimeTableVM[] };
export type TimeTableRowComponentProps = {
  day: string;
  times: OpenCloseTime[];
};
