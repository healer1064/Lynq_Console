// libraries
import { useState } from "react";
import { getDayAndMonth, getFormatedTime } from "../../utils/DateHelper";

// styles
import styles from "../../styles/PublicScreen.module.sass";

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
    const dates = sortDates().map((slot) => getDayAndMonth(slot.date));

    return dates;
  };

  const sortDates = () => {
    let newArr = [];

    // conver to arary
    Object.entries(slots).map((item) => {
      newArr.push({ date: item[0], slots: item[1] });
    });

    // sort
    newArr.sort((a, b) => new Date(a.date) - new Date(b.date));

    return newArr;
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
          {sortDates().map((_times, i) => (
            <div key={i}>
              {_times.slots.map((_time, j) => (
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
