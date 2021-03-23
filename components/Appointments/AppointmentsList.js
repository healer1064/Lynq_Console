// components
import AppointmentsListItem from "./AppointmentsListItem";
import EmptyData from "../common/EmptyData";

const AppointmentsList = ({ data }) => {
  var groupArrays = [];

  if (data.length > 0) {
    const groups = data.reduce((groups, appointment) => {
      const date = appointment.starting_date.split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(appointment);
      return groups;
    }, {});

    groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        appointments: groups[date],
      };
    });
  }

  return groupArrays.length === 0 ? (
    <div className="no-appointments">
      <p>No appointments to show</p>
    </div>
  ) : (
    <div className="appointments-col">
      {groupArrays.map((item, index) => {
        return <AppointmentsListItem data={item} key={index} />;
      })}
    </div>
  );
};

export default AppointmentsList;
