// libraries
import { useState } from "react";

// components
import Calendar from "./Calendar";
import NewAppointmentButton from "./NewAppointmentButton";

const AppointmentsTop = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="appointments-top">
      <NewAppointmentButton />
      <div className="appointments-top__calendar">
        <div className="prev">
          <img src="/img/appointments-calendar-prev.svg" alt="" />
        </div>
        <div className="dates" onClick={() => setOpen(true)}>
          <img src="/img/appointments-calendar-icon.svg" alt="" />
          <span>21-28 February 2021</span>
          {open && <Calendar setOpen={setOpen} />}
        </div>
        <div className="next">
          <img src="/img/appointments-calendar-next.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTop;
