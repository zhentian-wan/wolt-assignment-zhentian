import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "jest-axe/extend-expect";
import TimeTable from "../TimeTable";
import { transform } from "../TimeTable.model";
import { defTimeTable } from "../../data";

test("should render the table correctly", async () => {
  const formattedData = transform(defTimeTable);
  console.log(formattedData);
  const { getByText } = render(<TimeTable timeTable={formattedData} />);
  // header
  expect(getByText(/date/i)).toBeInTheDocument();
});
