// libraries
import { useState } from "react";

// styles
import styles from "./styles.module.sass";

// components
import Item from "./Item";

const index = ({ data, setPeriod }) => {
  // states
  const [index, setIndex] = useState(1);

  return (
    <div className={styles.stats}>
      <div className={styles.switch}>
        <div
          className={`${styles.option}  ${index === 1 ? styles.active : ""}`}
          onClick={() => {
            setIndex(1);
            setPeriod("TODAY");
          }}
        >
          Today
        </div>
        <div
          className={`${styles.option}  ${index === 2 ? styles.active : ""}`}
          onClick={() => {
            setIndex(2);
            setPeriod("WEEK");
          }}
        >
          Weekly
        </div>
        <div
          className={`${styles.option}  ${index === 3 ? styles.active : ""}`}
          onClick={() => {
            setIndex(3);
            setPeriod("MONTH");
          }}
        >
          Monthly
        </div>
        <div
          className={`${styles.option}  ${index === 4 ? styles.active : ""}`}
          onClick={() => {
            setIndex(4);
            setPeriod("YEAR");
          }}
        >
          Yearly
        </div>
      </div>
      <select
        value={index}
        onChange={(e) => {
          setIndex(e.target.value);
          e.target.value == 1
            ? setPeriod("TODAY")
            : e.target.value == 2
            ? setPeriod("WEEK")
            : e.target.value == 3
            ? setPeriod("MONTH")
            : setPeriod("YEAR");
        }}
        className={styles.select}
      >
        <option value={1}>Today</option>
        <option value={2}>Weekly</option>
        <option value={3}>Monthly</option>
        <option value={4}>Yearly</option>
      </select>
      <Item stats={data} />
    </div>
  );
};

export default index;
