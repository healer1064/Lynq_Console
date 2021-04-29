// components
import AppointmentsListItem from "./AppointmentsListItem";
import NewAppointmentButton from "./NewAppointmentButton";

const AppointmentsList = ({ appointmentList, toggle }) => {
  const sortList = (list) => {
    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return appointmentList.length === 0 ? (
    <div className="no-appointments">
      <NewAppointmentButton isLeft={false} />
      <p>No appointments to show</p>
    </div>
  ) : (
    <div className="appointments-list_wrapper">
      <NewAppointmentButton isLeft={false} />
      <div className="appointments-col">
        {sortList(appointmentList).map((item, index) => {
          return (
            <AppointmentsListItem data={item} key={index} toggle={toggle} />
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentsList;
