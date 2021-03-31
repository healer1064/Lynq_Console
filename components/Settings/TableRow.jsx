import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";

// icon
import { RiEditBoxLine } from "react-icons/ri";

import { changeTo24 } from "../../utils/DateHelper";

// components
import TimeModal from "../Settings/TimeModal";

const TableRow = ({ day, data, updateTime, deleteTime }) => {
  console.log("table Row", data);
  const [count, setCount] = useState(3);
  const [isAvailable, setIsAvailable] = useState(data.length > 0);
  const [timeSlots, setTimeSlots] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(null);
  const [delLoading, setDelLoading] = useState(false);

  useEffect(() => {
    setTimeSlots(data);
    setDelLoading(false);
  }, [data]);

  const addTime = (_start, _end) => {
    setTimeSlots([
      { start_period_time: _start, end_period_time: _end, id: count },
      ...timeSlots,
    ]);
    setCount(count + 1);
  };

  const removeTime = (_id) => {
    console.log(_id);
    // let temp = [...timeSlots];
    // let filter = temp.filter((item) => item.id !== _id);
    // setTimeSlots(filter);
    deleteTime(_id);
    setDelLoading(true);
  };

  // const handleEditTime = (_id, _start, _end) => {
  //   let startTime = changeTo24(_start);
  //   let endTime = changeTo24(_end);

  //   startTime.format = _start;
  //   endTime.format = _end;

  //   setTime({ id: _id, startTime, endTime });
  //   setIsOpen(true);
  // };

  const editTime = (_id, _start, _end) => {
    toggle();

    let temp = timeSlots.map((item) =>
      item.id !== _id ? item : { id: _id, start: _start, end: _end }
    );

    setTimeSlots(temp);
  };

  const toggle = () => {
    if (time) setTime(null);
    setIsOpen(!isOpen);
  };

  const handleTime = (_start, _end) => {
    toggle();
    addTime(_start, _end);
  };

  return (
    <>
      {!isAvailable ? (
        <Fade duration={1000}>
          <div className="setup-table__row">
            <div className="setup-table__day">
              <img
                src="/img/setup-check-unavailable.svg"
                alt=""
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsAvailable(true);
                  updateTime(day, "09:00:00", "17:00:00");
                  // addTime("09:00:00", "17:00:00");
                }}
              />
              <span>{day.substring(0, 3)}</span>
            </div>
            <div className="setup-table__col">
              <span className="unavailable">Unavailable</span>
            </div>
            <div className="setup-table__add">
              {/* <img src="/img/setup-add.svg" alt="" /> */}
            </div>
          </div>
        </Fade>
      ) : (
        <div className="setup-table__row available">
          <div className="setup-table__day">
            <img
              src="/img/setup-check-available.svg"
              alt=""
              style={{ cursor: "pointer" }}
              onClick={() => setIsAvailable(false)}
            />
            <span>{day.substring(0, 3)}</span>
          </div>
          <div className="setup-table__col">
            {timeSlots.map((item, i) => (
              <div key={i} style={{ margin: ".25rem 0" }}>
                <Fade collapse bottom duration={1000}>
                  <div className="time__row">
                    <input
                      type="text"
                      value={item.start_period_time}
                      readOnly
                    />
                    <div className="line"></div>
                    <input type="text" value={item.end_period_time} readOnly />
                    <div className="icon-wrapper">
                      {/* <RiEditBoxLine
                        size={18}
                        onClick={() =>
                          handleEditTime(
                            item.id,
                            item.start_period_time,
                            item.end_period_time
                          )
                        }
                      /> */}
                      {!delLoading ? (
                        <img
                          src="/img/setup-trash.svg"
                          alt="delete time slot"
                          onClick={() => removeTime(item.id)}
                        />
                      ) : (
                        <img
                          style={{ width: "18px", height: "18px" }}
                          src="/img/Rolling-dark.svg"
                          alt="rolling"
                        />
                      )}
                    </div>
                  </div>
                </Fade>
              </div>
            ))}
          </div>
          <div className="setup-table__add">
            <img src="/img/setup-add.svg" alt="" onClick={toggle} />
          </div>
        </div>
      )}
      {isOpen && (
        <TimeModal
          isOpen={isOpen}
          toggle={toggle}
          handleTime={handleTime}
          defaultTime={time}
          editTime={editTime}
        />
      )}
    </>
  );
};

export default TableRow;
