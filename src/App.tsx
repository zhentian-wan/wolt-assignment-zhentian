import * as React from "react";
import "./styles.css";
import TimeTable from "./components/TimeTable";
import { getTimeTable } from "./components/TImeTable.model";

export default function App() {
  const [timeTable, setTimeTable] = React.useState();

  React.useEffect(() => {
    const data = getTimeTable();
    setTimeTable(data);
  }, []);

  return (
    <div className="App">
      <TimeTable timeTable={timeTable} />
    </div>
  );
}
