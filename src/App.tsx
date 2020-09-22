import * as React from "react";
import "./styles.css";
import TimeTable from "./components/TimeTable";
import { getTimeTable } from "./data";

export default function App() {
  const [timeTable, setTimeTable] = React.useState();

  React.useEffect(() => {
    async function loadData() {
      const data = await getTimeTable();
      setTimeTable(data);
    }
    loadData();

    return () => {
      // any necessary clean up functions
    };
  }, []);

  return (
    <div className="App">
      <TimeTable timeTable={timeTable} />
    </div>
  );
}
