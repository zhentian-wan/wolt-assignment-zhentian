import * as React from "react";
import "./styles.css";
import TimeTable from "./components/TimeTable";
import { transform } from "./components/TimeTable.model";
import { getTimeTable } from "./data";

export default function App() {
  const [timeTable, setTimeTable] = React.useState([]);

  React.useEffect(() => {
    async function loadData() {
      const rawData = await getTimeTable();
      const formattedData = transform(rawData);
      setTimeTable(formattedData);
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
