export type OpenCloseTime = {
  type: "close" | "open";
  value: number;
};

// data model
export interface IWeeklyTimeTable {
  /*monday: OpenCloseTime[];
  tuseday: OpenCloseTime[];
  wednesday: OpenCloseTime[];
  thursday: OpenCloseTime[];
  friday: OpenCloseTime[];
  saturday: OpenCloseTime[];
  sunday: OpenCloseTime[];*/
  [key: string]: OpenCloseTime[];
}

// view model
export type WeeklyTimeTableVM = [string, OpenCloseTime[]];

export type TimeTableComponentProps = { timeTable: WeeklyTimeTableVM[] };
export type TimeTableRowComponentProps = {
  day: string;
  times: OpenCloseTime[];
};
