// libraries
import { useState, useEffect } from "react";
import moment from "moment";
import Fade from "react-reveal/Fade";

// components
import AppointmentCard from "../Home/AppointmentCard";

const AppointmentsListItem = ({ data }) => {
  // state
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(true);

  const { date, appointments } = data;

  useEffect(() => {
    var currentDate = new Date();

    const stat = appointments.map((apt) => apt.starting_date);
    var bool = false;
    stat.forEach((i) => {
      bool = new Date(i) >= currentDate;
    });
    setStatus(bool);
  }, [data]);

  const sortList = (list) => {
    return list.sort(
      (a, b) => new Date(a.starting_date) - new Date(b.starting_date)
    );
  };

  return (
    <div
      className={`appointments-col__card__wrp ${status ? "" : "inactive"} ${
        open ? "active" : ""
      }
      `}
    >
      <div
        onClick={() => {
          appointments && setOpen(!open);
        }}
        className="appointments-col__card"
        // style={{ backgroundColor: `${!status && "#E1E1E1"}` }}
      >
        <div
          className="det"
          style={{
            fontWeight: status ? "600" : "400",
          }}
        >
          {moment(date).format("dddd")}
          <div className="line"></div>
          {moment(date).format("MMMM DD, YYYY")}
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
        <>
          <div style={{ width: "100%" }}>
            {sortList(appointments).map((data, index) => (
              <Fade key={index} collapse duration={1000}>
                <AppointmentCard key={index} data={data} />
              </Fade>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentsListItem;
