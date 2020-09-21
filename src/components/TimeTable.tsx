import React from "react";

import { ReactComponent as TimeIcon } from "./query.svg";
import Box from "./Box";
import Text from "./Text";
import { getTimeTable } from "./TImeTable.model";

export default function TimeTable({ timeTable }) {
  return (
    <div>
      <h1>
        <Box px={3}>
          <TimeIcon fill="grey" alt="Opening hours" aria-hidden />
        </Box>
        <Text>Opening hours</Text>
      </h1>
      <pre>{JSON.stringify(timeTable, null, 2)}</pre>
    </div>
  );
}
