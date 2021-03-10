import { useState } from "react";
import { format, compareAsc } from "date-fns";

// styles
import styles from "../../styles/PublicScreen.module.sass";

// Fake Data
import TimeSlots from "../../utils/data/SlotsFakeData";

const PublicScreen2Calendar = ({ slots, setTime, setError }) => {
  const [index, setIndex] = useState(-1);
  const [jIndex, setJIndex] = useState(-1);

  const getDates = () => {
    const dates = TimeSlots.map((slot) => ({
      name: slot.day_name,
      date: slot.date,
    }));
    return dates;
  };

  const getTimes = () => {
    const times = TimeSlots.map((slot) => slot.slots);

    return times;
  };

  return (
    <div className={styles.booking_calendar}>
      <div className={styles.calendar_head}>
        <div>
          <img src="/img/public-screen-left.svg" alt="left" />
        </div>
        <div>
          <img src="/img/public-screen-right.svg" alt="right" />
        </div>
      </div>
      <div className={styles.calendar_body}>
        <div className={styles.table_head}>
          {getDates().map((slot, i) => (
            <div key={i}>
              <h6>{slot.name}</h6>
              <p>{slot.date}</p>
            </div>
          ))}
        </div>
        <div className={styles.table_body}>
          {getTimes().map((times, i) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicScreen2Calendar;
