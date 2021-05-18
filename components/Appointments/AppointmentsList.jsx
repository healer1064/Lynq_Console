// components
import AppointmentsListItem from "./AppointmentsListItem";
import NewAppointmentButton from "./NewAppointmentButton";

const AppointmentsList = ({ appointmentList }) => {
  const getSortedList = (list) => {
    let currentDate = new Date();

    let nextAppointments = list.filter(
      (item) => new Date(item.date) >= currentDate
    );

    let prevAppointments = list.filter(
      (item) => new Date(item.date) < currentDate
    );

    nextAppointments = sortList(nextAppointments, 1);
    prevAppointments = sortList(prevAppointments, 2);

    let sortedList = nextAppointments.concat(prevAppointments);

    return sortedList;
  };

  const sortList = (list, order) => {
    if (order === 1)
      return list.sort((a, b) => new Date(a.date) - new Date(b.date));
    else return list.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return appointmentList.length === 0 ? (
    <div className="no-appointments">
      <NewAppointmentButton isLeft={false} />
      <br />
      <br />
      <p style={{ alignSelf: "flex-start", paddingLeft: "8px" }}>
        No appointments to show
      </p>
    </div>
  ) : (
    <div className="appointments-list_wrapper">
      <NewAppointmentButton isLeft={false} />
      <br />
      <div className="appointments-col">
        {getSortedList(appointmentList).map((item, index) => {
          return <AppointmentsListItem data={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default AppointmentsList;
