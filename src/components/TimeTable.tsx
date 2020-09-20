import React from "react";

import { getTimeTable } from "./TImeTable.model";

export default function TimeTable() {
  return (
    <div>
      <h1>Opening Hours</h1>
      <pre>{JSON.stringify(getTimeTable(), null, 2)}</pre>
    </div>
  );
}
