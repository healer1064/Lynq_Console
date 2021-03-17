// libraries
import { useState } from "react";
import Fade from "react-reveal/Fade";

// components
import AppointmentCard from "../Home/AppointmentCard";

const AppointmentsListItem = ({ data }) => {
  // state
  const [open, setOpen] = useState(false);

  const { day, date, appointments, status, userAppointments } = data;

  return (
    <div
      className={`appointments-col__card__wrp 
      ${status === "inactive" && "inactive"}
      ${open && "active"}
      `}
    >
      <div
        onClick={() => {
          userAppointments && setOpen(!open);
        }}
        className="appointments-col__card"
      >
        <div className="det">
          {day}
          <div className="line"></div>
          {date}
          <div className="line"></div>
          <b>{appointments} appointments</b>
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
      {open && userAppointments && (
        <div style={{ width: "100%" }}>
          {userAppointments.map((data, index) => (
            <Fade key={index} bottom collapse duration={1000}>
              <AppointmentCard key={index} data={data} />
            </Fade>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsListItem;
