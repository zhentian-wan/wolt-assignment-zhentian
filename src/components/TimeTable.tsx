import React, { useState, useEffect, memo } from "react";
import { ReactComponent as TimeIcon } from "./query.svg";
import Box from "./Box";
import Divider from "./Divider";
import { Row, Column } from "./Flex";
import Text, { HighlighedText, SecondaryText, Capitalize } from "./Text";
import Heading from "./Heading";

import {
  isNotOperating,
  printListOpenCloseTimeInPair,
  gerReadableAria
} from "./TimeTable.model";
import { isSameWeekDay } from "../utils/date.helper";

const TimeTableRow = memo(({ day, times }) => (
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
          {printListOpenCloseTimeInPair(times).map((time) => {
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
));

export default memo(function TimeTable({ timeTable }) {
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
    </Box>
  );
});
