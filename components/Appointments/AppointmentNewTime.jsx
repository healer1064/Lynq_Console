// libraries
import { useState, useEffect } from "react";

// utils
import { getTime, fullDate } from "../../utils/dates";

// components
import PageLoading from "../common/PageLoading";
import AppointmentTimeButton from "./AppointmentTimeButton";

const AppointmentNewTime = ({ times, setTime, loading }) => {
  // states
  const [headDates, setHeadDates] = useState();
  const [bodyTimes, setBodyTimes] = useState();
  const [itemIndex, setItemIndex] = useState();

  useEffect(() => {
    let head = [];
    let body = [];

    if (times) {
      Object.entries(times).map((item) => {
        head.push(item[0]);
        setHeadDates(head);
        body.push(item[1]);
        setBodyTimes(body);
      });
    }
  }, [times]);

  return (
    <div className="appointment-new__time">
      {loading ? (
        <div />
      ) : times && times.length === 0 ? (
        <div />
      ) : (
        <div className="top">
          <div className="arr prev">
            <img src="/img/appointment-time-prev.svg" alt="" />
          </div>
          <div className="days">
            {headDates &&
              headDates.map((item, index) => {
                return (
                  <div key={index} className="day">
                    <b>{fullDate(item).split(",")[0]}</b>
                    <span>{fullDate(item).split(",")[1]}</span>
                  </div>
                );
              })}
          </div>
          <div className="arr next">
            <img src="/img/appointment-time-next.svg" alt="" />
          </div>
        </div>
      )}
      <div style={{ position: "relative" }} className="btm">
        <div className="row">
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
                  <div key={index} className="col">
                    {item &&
                      item.map((time, ind) => (
                        <AppointmentTimeButton
                          key={ind}
                          time={time}
                          getTime={getTime}
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

export default AppointmentNewTime;
