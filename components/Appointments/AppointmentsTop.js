// libraries
import { useState } from "react";

// utils
import {
  getCurrentWeek,
  getPreviousWeek,
  getNextWeek,
  dateFormat,
} from "../../utils/DateHelper";

// components
import Calendar from "./Calendar";
import NewAppointmentButton from "./NewAppointmentButton";

const AppointmentsTop = () => {
  const [open, setOpen] = useState(false);

  const [currWeek, setCurrWeek] = useState(getCurrentWeek());
  const [prevWeek, setPrevWeek] = useState(
    getPreviousWeek(getCurrentWeek().weekStart)
  );
  const [nextWeek, setNextWeek] = useState(
    getNextWeek(getCurrentWeek().weekStart)
  );

  const showNextWeek = () => {
    setCurrWeek(nextWeek);
    setNextWeek(getNextWeek(nextWeek.weekStart));
    setPrevWeek(currWeek);
  };

  const showPreviousWeek = () => {
    setCurrWeek(prevWeek);
    setPrevWeek(getPreviousWeek(prevWeek.weekStart));
    setNextWeek(currWeek);
  };

  return (
    <div className="appointments-top">
      <NewAppointmentButton />
      <div className="appointments-top__calendar">
        <div className="prev" onClick={showPreviousWeek}>
          <img src="/img/appointments-calendar-prev.svg" alt="" />
        </div>
        <div className="dates" onClick={() => setOpen(true)}>
          <img src="/img/appointments-calendar-icon.svg" alt="" />
          <span>{dateFormat(currWeek.weekStart, currWeek.weekEnd)}</span>
          {open && <Calendar currDate={currWeek} setOpen={setOpen} />}
        </div>
        <div className="next" onClick={showNextWeek}>
          <img src="/img/appointments-calendar-next.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTop;
