import React, { useState } from "react";
import Fade from "react-reveal/Fade";

const TableRow = ({ day }) => {
  const [count, setCount] = useState(3);
  const [isAvailable, setIsAvailable] = useState(false);
  const [timeSlots, setTimeSlots] = useState([{ value: 9, id: 1 }]);

  const addTime = () => {
    setTimeSlots([{ value: count, id: count }, ...timeSlots]);
    setCount(count + 1);
  };

  const removeTime = (id) => {
    let temp = [...timeSlots];
    let filter = temp.filter((item) => item.id !== id);
    setTimeSlots(filter);
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
              <img src="/img/setup-add.svg" alt="" />
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
                    <input type="time" value={`0${item.value}:00`} />
                    <div className="line"></div>
                    <input type="time" value="17:00" />
                    <div className="trash">
                      <img
                        src="/img/setup-trash.svg"
                        alt=""
                        onClick={() => removeTime(item.id)}
                      />
                    </div>
                  </div>
                </Fade>
              </div>
            ))}
          </div>
          <div className="setup-table__add">
            <img src="/img/setup-add.svg" alt="" onClick={addTime} />
          </div>
        </div>
      )}
    </>
  );
};

export default TableRow;
