import { getToday } from "../date.helper";

describe("Helper functions", () => {
  test("getToday", () => {
    jest
      .spyOn(global, "Date")
      .mockImplementation(() => new Date(1466424490000));
    const res = `${getToday()}`;
    expect(res).toEqual("2020-08-21T21:00:00.000Z");
  });
});
