import React, { useState } from "react";
import Fade from "react-reveal/Fade";

// icon
import { RiEditBoxLine } from "react-icons/ri";

import { changeTo24 } from "../../utils/DateHelper";

// components
import TimeModal from "../Settings/TimeModal";

const TableRow = ({ day }) => {
  const [count, setCount] = useState(3);
  const [isAvailable, setIsAvailable] = useState(false);
  const [timeSlots, setTimeSlots] = useState([
    { start: "09:00 am", end: "05:00 pm", id: 1 },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(null);

  const addTime = (_start, _end) => {
    setTimeSlots([{ start: _start, end: _end, id: count }, ...timeSlots]);
    setCount(count + 1);
  };

  const removeTime = (id) => {
    let temp = [...timeSlots];
    let filter = temp.filter((item) => item.id !== id);
    setTimeSlots(filter);
  };

  const handleEditTime = (_id, _start, _end) => {
    let startTime = changeTo24(_start);
    let endTime = changeTo24(_end);

    startTime.format = _start;
    endTime.format = _end;

    setTime({ id: _id, startTime, endTime });
    setIsOpen(true);
  };

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
                onClick={() => setIsAvailable(true)}
              />
              <span>{day}</span>
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
            <span>{day}</span>
          </div>
          <div className="setup-table__col">
            {timeSlots.map((item, i) => (
              <div key={item.id} style={{ margin: ".25rem 0" }}>
                <Fade collapse bottom duration={1000}>
                  <div className="time__row">
                    <input type="text" value={item.start} readOnly />
                    <div className="line"></div>
                    <input type="text" value={item.end} readOnly />
                    <div className="icon-wrapper">
                      <RiEditBoxLine
                        size={18}
                        onClick={() =>
                          handleEditTime(item.id, item.start, item.end)
                        }
                      />
                      <img
                        src="/img/setup-trash.svg"
                        alt=""
                        onClick={() => removeTime(item.id)}
                      />
                      {/* <div className="trash">
                      </div> */}
                      {/* <div className="trash">
                        <img
                          src="/img/setup-trash.svg"
                          alt=""
                          onClick={() => removeTime(item.id)}
                        />
                      </div> */}
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
