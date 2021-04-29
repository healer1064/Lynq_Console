// components
import AppointmentsListItem from "./AppointmentsListItem";
import NewAppointmentButton from "./NewAppointmentButton";

const AppointmentsList = ({ appointmentList, toggle }) => {
  return appointmentList.length === 0 ? (
    <div className="no-appointments">
      <NewAppointmentButton isLeft={false} />
      <p>No appointments to show</p>
    </div>
  ) : (
    <div className="appointments-list_wrapper">
      <NewAppointmentButton isLeft={false} />
      <div className="appointments-col">
        {appointmentList.map((item, index) => {
          return (
            <AppointmentsListItem data={item} key={index} toggle={toggle} />
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentsList;
