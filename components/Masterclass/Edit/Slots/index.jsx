// libraries
import { useState, useEffect } from "react";
import moment from "moment";

// components
import PageLoading from "@/components/common/PageLoading";
import Item from "./Item";

// styles
import styles from "./styles.module.sass";

const index = ({
  times,
  setTime,
  handleNextArrow,
  handlePrevArrow,
  prevDisable,
}) => {
  // states
  const [headDates, setHeadDates] = useState();
  const [bodyTimes, setBodyTimes] = useState();
  const [itemIndex, setItemIndex] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let head = [];
    let body = [];

    if (times.length > 0) {
      times.forEach((item) => {
        head.push(item.date);
        body.push(item.slots);
      });
      setHeadDates(head);
      setBodyTimes(body);
    }
  }, [times]);

  const sortArr = (arr) => {
    return arr.sort((a, b) => {
      return moment(a).toDate() - moment(b).toDate();
    });
  };

  return (
    <div className={styles.slots}>
      {loading ? (
        <div />
      ) : times && times.length === 0 ? (
        <div />
      ) : (
        <div className={styles.top}>
          <div
            style={{ cursor: `${prevDisable ? "no-drop" : "pointer"}` }}
            className={`${styles.arr} ${styles.prev}`}
            onClick={() => !prevDisable && handlePrevArrow()}
          >
            <img src="/img/appointment-time-prev.svg" alt="" />
          </div>
          <div className={styles.days}>
            {headDates &&
              headDates.map((item, index) => {
                return (
                  <div key={index} className={styles.day}>
                    <b>{moment(item).format("dddd")}</b>
                    <span>{moment(item).format("MMM DD")}</span>
                  </div>
                );
              })}
          </div>
          <div
            className={`${styles.arr} ${styles.next}`}
            onClick={handleNextArrow}
          >
            <img src="/img/appointment-time-next.svg" alt="" />
          </div>
        </div>
      )}
      <div style={{ position: "relative" }} className={styles.btm}>
        <div className={styles.row}>
          {loading ? (
            <div style={{ position: "absolute", left: "45%", top: "30%" }}>
              <PageLoading />
            </div>
          ) : times && times.length == 0 ? (
            <p>No times to show</p>
          ) : (
            <>
              {bodyTimes &&
                bodyTimes.map((item, index) => (
                  <div key={index} className={styles.col}>
                    {item &&
                      sortArr(item).map((time, ind) => (
                        <Item
                          key={ind}
                          time={time}
                          setTime={setTime}
                          pIndex={index}
                          index={ind}
                          itemIndex={itemIndex}
                          setItemIndex={setItemIndex}
                        />
                      ))}
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
