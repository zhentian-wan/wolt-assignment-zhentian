export type OpenCloseTime = {
  type: "close" | "open";
  value: number;
};

// data model
export interface IWeeklyTimeTable {
  [key: string]: OpenCloseTime[];
}
export type weeksNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
// view model
export type WeeklyTimeTableVM = [string, OpenCloseTime[]];

export type TimeTableComponentProps = { timeTable: WeeklyTimeTableVM[] };
export type TimeTableRowComponentProps = {
  day: string;
  times: OpenCloseTime[];
};
