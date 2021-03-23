// libraries
import { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";

// components
import AppointmentCard from "../Home/AppointmentCard";

// utils
import { dayNames, monthNames } from "../../utils/dates";

const AppointmentsListItem = ({ data }) => {
  // state
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(true);

  const { date, appointments } = data;

  const day = (date) => {
    var d = new Date(date.toString());
    return dayNames[d.getDay()];
  };

  useEffect(() => {
    var currentDate = new Date();
    var serverDate = new Date(date);

    setStatus(serverDate > currentDate);
    console.log(serverDate > currentDate);
  }, [data]);

  const fullDate = (d) => {
    const date = new Date(d);
    return `${monthNames[date.getMonth()]}
     ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div
      className={`appointments-col__card__wrp
      ${status ? "" : "inactive"}
      ${open && "active"}
      `}
    >
      <div
        onClick={() => {
          appointments && setOpen(!open);
        }}
        className="appointments-col__card"
      >
        <div className="det">
          {day(date)}
          <div className="line"></div>
          {fullDate(date)}
          <div className="line"></div>
          <b>{appointments.length} appointments</b>
        </div>
        <div className="arrow">
          <svg
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 12L0.0717964 0L13.9282 0L7 12Z" fill="#7E88F4" />
          </svg>
        </div>
      </div>
      {open && appointments && (
        <div style={{ width: "100%" }}>
          {appointments.map((data, index) => (
            <Fade key={index} collapse duration={1000}>
              <AppointmentCard key={index} data={data} />
            </Fade>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsListItem;
