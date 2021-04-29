// libraries
import { useState } from "react";
import DatePicker from "react-datepicker";
import onClickOutside from "react-onclickoutside";

// styles
// import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/Calendar.module.sass";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";

const Calendar = ({ currDate, setOpen, handleChange }) => {
  const [startDate, setStartDate] = useState(currDate.weekStart);
  const [endDate, setEndDate] = useState(currDate.weekEnd);

  const [state, setState] = useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    },
  ]);

  const onChange = (dates) => {
    // const [start, end] = dates;
    // setStartDate(start);
    // setEndDate(end);

    const start = dates.selection.startDate;
    const end = dates.selection.endDate;

    setState([dates.selection]);

    // if (end !== null) handleChange(start, end);
    handleChange(start, end);
  };

  Calendar.handleClickOutside = () => setOpen(false);

  return (
    <div className={styles.calendar}>
      {/* <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        shouldCloseOnSelect
        inline
      /> */}
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
const clickOutsideConfig = {
  handleClickOutside: () => Calendar.handleClickOutside,
};

export default onClickOutside(Calendar, clickOutsideConfig);
