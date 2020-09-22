import React from "react";
import { ReactComponent as TimeIcon } from "./query.svg";
import Box from "./Box";
import Divider from "./Divider";
import { Row } from "./Flex";
import Text, { HighlighedText, SecondaryText } from "./Text";
import Heading from "./Heading";

const TimeTableRow = (porps) => (
  <>
    <Row justifyContent="space-between">
      <Box>
        <Text>Monday</Text>
        <HighlighedText mx={2}>TODAY</HighlighedText>
      </Box>
      <SecondaryText>Closed</SecondaryText>
    </Row>
    <Divider opacity="0.2" />
  </>
);

export default function TimeTable({ timeTable }) {
  return (
    <Box
      p="25px"
      minWidth="320px"
      maxWidth="320px"
      borderRadius="20px"
      boxShadow="0 0 5px 5px #F8F8F8"
      m="0 auto"
      role="table"
      aria-labelledby="timeTable__title"
    >
      <Heading level={2} id="timeTable__title" alignItems="center">
        <TimeIcon fill="grey" alt="Opening hours" aria-hidden />
        <Text pl="10px">Opening hours</Text>
      </Heading>
      <Divider color="black" />
      <Box mt={3}>
        {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
          return <TimeTableRow key={item} />;
        })}
      </Box>
    </Box>
  );
}
