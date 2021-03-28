// libraries
import { useState, useEffect } from "react";
import moment from "moment";

// components
import PageLoading from "../common/PageLoading";
import AppointmentTimeButton from "./AppointmentTimeButton";

const AppointmentNewTime = ({
  times,
  setTime,
  loading,
  handleNextArrow,
  handlePrevArrow,
}) => {
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
          <div className="arr prev" onClick={handlePrevArrow}>
            <img src="/img/appointment-time-prev.svg" alt="" />
          </div>
          <div className="days">
            {headDates &&
              headDates.map((item, index) => {
                return (
                  <div key={index} className="day">
                    <b>{moment(item).format("dddd")}</b>
                    <span>{moment(item).format("MMM DD")}</span>
                  </div>
                );
              })}
          </div>
          <div className="arr next" onClick={handleNextArrow}>
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
