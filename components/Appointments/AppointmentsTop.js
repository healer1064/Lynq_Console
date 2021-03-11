// components
import NewAppointmentButton from "./NewAppointmentButton";

const AppointmentsTop = () => {
  return (
    <div className="appointments-top">
      <NewAppointmentButton />
      <div className="appointments-top__calendar">
        <div className="prev">
          <img src="/img/appointments-calendar-prev.svg" alt="" />
        </div>
        <div className="dates">
          <img src="/img/appointments-calendar-icon.svg" alt="" />
          <span>21-28 February 2021</span>
        </div>
        <div className="next">
          <img src="/img/appointments-calendar-next.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTop;
