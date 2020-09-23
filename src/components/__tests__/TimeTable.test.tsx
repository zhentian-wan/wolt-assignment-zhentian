import React from "react";
import { axe } from "jest-axe";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "jest-axe/extend-expect";
import TimeTable from "../TimeTable";
import { transform } from "../TimeTable.model";
import { defTimeTable } from "../../data";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";

test("should render the table correctly", async () => {
  const formattedData = transform(defTimeTable);
  const { getByText, getAllByTestId, container } = render(
    <ThemeProvider theme={theme}>
      <TimeTable timeTable={formattedData} />
    </ThemeProvider>
  );
  // header
  expect(getByText(/Opening hours/i)).toBeInTheDocument();

  // body
  // should have Today mark
  expect(getByText(/today/i)).toBeInTheDocument();
  // should have 7 rows
  const rows = getAllByTestId(/timetablerow-/i);
  expect(rows.length).toEqual(formattedData.length);
  // monday is closed
  expect(rows[0].textContent).toContain("Closed");
  expect(rows[0].textContent).toContain("monday");
  // sunday is 12 PM - 9 PM
  expect(rows[rows.length - 1].textContent).toContain("12 PM - 9 PM");
  expect(rows[rows.length - 1].textContent).toContain("sunday");
  // no aria issue
  expect(await axe(container)).toHaveNoViolations();
});
