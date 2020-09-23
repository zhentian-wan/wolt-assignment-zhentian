import React, { useState, useEffect, memo } from "react";
import { ReactComponent as TimeIcon } from "./query.svg";
import Box from "../system/Box";
import Divider from "../system/Divider";
import { Row, Column } from "../system/Flex";
import Text, {
  HighlighedText,
  SecondaryText,
  Capitalize
} from "../system/Text";
import Heading from "../system/Heading";

import {
  isNotOperating,
  printListOpenCloseTimeInPair,
  gerReadableAria
} from "./TimeTable.model";
import { isSameWeekDay } from "../utils/date.helper";
import {
  TimeTableComponentProps,
  TimeTableRowComponentProps,
  OpenCloseTime
} from "../models";

const TimeTableRow: React.FC<TimeTableRowComponentProps> = memo(
  ({ day, times }) => (
    <>
      <Row justifyContent="space-between">
        <Box>
          <Capitalize fontWeight="500">{day}</Capitalize>
          {isSameWeekDay(day) ? (
            <HighlighedText mx={2}>TODAY</HighlighedText>
          ) : null}
        </Box>
        {isNotOperating(times) ? (
          <SecondaryText>Closed</SecondaryText>
        ) : (
          <Column>
            {printListOpenCloseTimeInPair(times).map((time: OpenCloseTime) => {
              return (
                <Text textAlign="right" key={time} py="2px">
                  {time}
                </Text>
              );
            })}
          </Column>
        )}
      </Row>
      <Divider opacity="0.2" />
    </>
  )
);

export const TimeTable: React.FC<TimeTableComponentProps> = memo(
  ({ timeTable }) => {
    const [hoursInfoAria, setHoursInfoAria] = useState("");

    useEffect(() => {
      if (timeTable.length === 0) {
        return;
      }
      const openingHoursInfo = gerReadableAria(timeTable);
      setHoursInfoAria(openingHoursInfo);
    }, [timeTable]);

    return (
      <Box
        p="25px"
        width="auto"
        minWidth="360px"
        maxWidth="360px"
        borderRadius="10px"
        boxShadow="0 0 5px 5px #F8F8F8"
        m="0 auto"
        role="table"
        aria-labelledby="timeTable__title"
      >
        <Heading
          level={2}
          py="10px"
          aria-label={`${hoursInfoAria}`}
          id="timeTable__title"
        >
          <TimeIcon fill="grey" alt="Opening hours" aria-hidden />
          <Text fontSize="30px" pl="10px">
            Opening hours
          </Text>
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
);

export default TimeTable;
