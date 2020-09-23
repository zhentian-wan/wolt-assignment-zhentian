import {
  printTime,
  isNotOperating,
  isCloseOnSameDay
} from "../TimeTable.model";
import { OpenCloseTime } from "../../models";

describe("Utils functions", () => {
  test("isNotOperating", () => {
    // not opening
    const data = [];
    const expected = true;
    const res = isNotOperating(data);
    expect(res).toBe(expected);
    // opening
    const data2 = [{ type: "open", value: 3600 }] as OpenCloseTime[];
    const expected2 = false;
    const res2 = isNotOperating(data2);
    expect(res2).toBe(expected2);
  });

  test("prettyDate", () => {
    const datas = [32400, 37800, 86399, 0, 480];
    const formatted = ["9 AM", "10:30 AM", "11:59 PM", "12 AM", "00:08 AM"];
    datas.forEach((d, i) => {
      const res = printTime(d);
      const expected = formatted[i];
      expect(res).toEqual(expected);
    });
  });

  test("isCloseOnSameDay", () => {
    const closeToday = [
      [
        { type: "open", value: 3600 },
        { type: "close", value: 36000 }
      ],
      [
        { type: "open", value: 3600 },
        { type: "close", value: 36000 }
      ]
    ];
    const closeNextDay = [
      [{ type: "open", value: 36000 }],
      [
        { type: "close", value: 3600 },
        { type: "open", value: 43200 },
        { type: "close", value: 75600 }
      ]
    ];
    const resCloseToday = isCloseOnSameDay(...closeToday);
    const resCloseNextDay = isCloseOnSameDay(...closeNextDay);
    expect(resCloseToday).toBe(true);
    expect(resCloseNextDay).toBe(false);
  });
});
