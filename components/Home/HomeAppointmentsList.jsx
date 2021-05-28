// components
import AppointmentCard from "./AppointmentCard";
import moment from "moment-timezone";

const HomeAppointmentsList = ({ appointmentList }) => {
  const sortList = (list) => {
    return list.sort(
      (a, b) =>
        moment(b.starting_date).valueOf() - moment(a.starting_date).valueOf()
    );
  };

  return appointmentList && appointmentList.length > 0 ? (
    appointmentList.map((appointment) =>
      sortList(appointment.appointments).map((item, index) => (
        <AppointmentCard key={index} data={item} />
      ))
    )
  ) : (
    <div className="no-appointments">
      <p>No appointments for today</p>
    </div>
  );
};

export default HomeAppointmentsList;
