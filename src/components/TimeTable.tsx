import React from "react";
import { ReactComponent as TimeIcon } from "./query.svg";
import Box from "./Box";
import Divider from "./Divider";
import { Row, Column } from "./Flex";
import Text, { HighlighedText, SecondaryText, Capitalize } from "./Text";
import Heading from "./Heading";

import { isNotOperating } from "./TimeTable.model";
import { isSameWeekDay } from "../utils/date.helper";

const TimeTableRow = ({ day, times }) => (
  <>
    <Row justifyContent="space-between">
      <Box>
        <Capitalize>{day}</Capitalize>
        {isSameWeekDay(day) ? (
          <HighlighedText mx={2}>TODAY</HighlighedText>
        ) : null}
      </Box>
      {isNotOperating(times) ? (
        <SecondaryText>Closed</SecondaryText>
      ) : (
        <Column>
          <Text py="2px">10 AM - 2 PM</Text>
          <Text py="2px">10 AM - 2 PM</Text>
          <Text py="2px">10 AM - 2 PM</Text>
        </Column>
      )}
    </Row>
    <Divider opacity="0.2" />
  </>
);

export default function TimeTable({ timeTable }) {
  return (
    <Box
      p="25px"
      width="auto"
      minWidth="320px"
      maxWidth="320px"
      borderRadius="20px"
      boxShadow="0 0 5px 5px #F8F8F8"
      m="0 auto"
      role="table"
      aria-labelledby="timeTable__title"
    >
      <Heading level={2} id="timeTable__title">
        <TimeIcon fill="grey" alt="Opening hours" aria-hidden />
        <Text pl="10px">Opening hours</Text>
      </Heading>
      <Divider color="black" />
      <Box mt={3}>
        {timeTable.map(([day, times]) => {
          return <TimeTableRow key={day} day={day} times={times} />;
        })}
      </Box>
      <pre>{JSON.stringify(timeTable, null, 2)}</pre>
    </Box>
  );
}
