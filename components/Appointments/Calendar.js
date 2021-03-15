// libraries
import { useState } from "react";
import DatePicker from "react-datepicker";
import onClickOutside from "react-onclickoutside";

// styles
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/Calendar.module.sass";

const Calendar = ({ setOpen }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  Calendar.handleClickOutside = () => setOpen(false);

  return (
    <div className={styles.calendar} outside>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    </div>
  );
};
const clickOutsideConfig = {
  handleClickOutside: () => Calendar.handleClickOutside,
};

export default onClickOutside(Calendar, clickOutsideConfig);
