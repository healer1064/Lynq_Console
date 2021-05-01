// libraries
import { useState } from "react";

// utils
import { getCurrentWeek } from "../../utils/DateHelper";

// components
import Calendar from "./Calendar";
import NewAppointmentButton from "./NewAppointmentButton";

const AppointmentsTop = ({ onWeekChange }) => {
  // states
  const [currWeek, setCurrWeek] = useState(getCurrentWeek());

  const handleChange = (_start, _end) => {
    setCurrWeek({ weekStart: _start, weekEnd: _end });
    onWeekChange(_start, _end);
  };

  return (
    <div className="appointments-top">
      <NewAppointmentButton isLeft={true} />
      <Calendar currDate={currWeek} handleChange={handleChange} />
    </div>
  );
};

export default AppointmentsTop;
