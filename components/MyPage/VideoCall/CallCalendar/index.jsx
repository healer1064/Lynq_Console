// libraries
import { useState } from "react";
import { DateRange } from "react-date-range";

// styles
import styles from "./styles.module.sass";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CallCalendar = ({ currDate, handleChange }) => {
  // states
  const [startDate, setStartDate] = useState(currDate.weekStart);
  const [endDate, setEndDate] = useState(currDate.weekEnd);
  const [state, setState] = useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    },
  ]);

  // handle change
  const onChange = (dates) => {
    const start = dates.selection.startDate;
    const end = dates.selection.endDate;
    setState([dates.selection]);
    handleChange(start, end);
  };

  return (
    <div className={styles.calendar}>
      <DateRange
        ranges={state}
        onChange={onChange}
        showDateDisplay={false}
        showMonthAndYearPickers={false}
        moveRangeOnFirstSelection={false}
        rangeColors={["#39BDCD"]}
      />
    </div>
  );
};

export default CallCalendar;
