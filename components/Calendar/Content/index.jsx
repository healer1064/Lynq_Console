// libraries
import { useState } from "react";

// styles
import styles from "./styles.module.sass";

// helpers
import { getCurrentWeek } from "@/utils/helpers/dates";

// components
import Calendar from "../Calendar";
import List from "../List";

const index = ({ data, onWeekChange }) => {
  // states
  const [currWeek, setCurrWeek] = useState(getCurrentWeek());

  // handle change
  const handleChange = (_start, _end) => {
    setCurrWeek({ weekStart: _start, weekEnd: _end });
    onWeekChange(_start, _end);
  };
  return (
    <div className={styles.content}>
      <List list={data} />
      <Calendar currDate={currWeek} handleChange={handleChange} />
    </div>
  );
};

export default index;
