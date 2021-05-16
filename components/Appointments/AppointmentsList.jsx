// components
import AppointmentsListItem from "./AppointmentsListItem";
import NewAppointmentButton from "./NewAppointmentButton";

const AppointmentsList = ({ appointmentList }) => {
  const sortList = (list) => {
    console.log("from appoitments", list);
    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
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
        {sortList(appointmentList).map((item, index) => {
          return <AppointmentsListItem data={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default AppointmentsList;
