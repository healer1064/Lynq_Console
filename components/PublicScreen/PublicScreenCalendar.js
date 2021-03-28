import { useState } from "react";
import { format, compareAsc } from "date-fns";

import { getDayAndMonth, getFormatedTime } from "../../utils/DateHelper";

// styles
import styles from "../../styles/PublicScreen.module.sass";

// mock up Data
import TimeSlots from "../../utils/data/SlotsFakeData";

const PublicScreenCalendar = ({
  slots,
  setTime,
  setError,
  handleNextArrow,
  handlePrevArrow,
}) => {
  const [index, setIndex] = useState(-1);
  const [jIndex, setJIndex] = useState(-1);

  const getDates = () => {
    const dates = Object.keys(slots).map((slot) => getDayAndMonth(slot));
    return dates;
  };

  const getTimes = () => {
    const times = TimeSlots.map((slot) => slot.slots);

    return times;
  };

  return (
    <div className={styles.booking_calendar}>
      <div className={styles.calendar_head}>
        <div onClick={handlePrevArrow}>
          <img src="/img/public-screen-left.svg" alt="left" />
        </div>
        <div onClick={handleNextArrow}>
          <img src="/img/public-screen-right.svg" alt="right" />
        </div>
      </div>
      <div className={styles.calendar_body}>
        <div className={styles.table_head}>
          {getDates().map((slot, i) => (
            <div key={i}>
              <h6>{slot.dayName}</h6>
              <p>{slot.day + " " + slot.month}</p>
            </div>
          ))}
        </div>
        <div className={styles.table_body}>
          {/* {getTimes().map((times, i) => (
            <div key={i}>
              {times.map((item, j) => (
                <div
                  key={j}
                  onClick={() => {
                    setIndex(i);
                    setJIndex(j);
                    setTime(item.time);
                    setError(false);
                  }}
                  className={index === i && jIndex === j ? styles.active : ""}
                >
                  <p>{item.time}</p>
                </div>
              ))}
            </div>
          ))} */}
          {Object.values(slots).map((_times, i) => (
            <div key={i}>
              {_times.map((_time, j) => (
                <div
                  key={j}
                  onClick={() => {
                    setIndex(i);
                    setJIndex(j);
                    setTime(_time);
                    setError(false);
                  }}
                  className={index === i && jIndex === j ? styles.active : ""}
                >
                  <p>{getFormatedTime(_time)}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicScreenCalendar;
