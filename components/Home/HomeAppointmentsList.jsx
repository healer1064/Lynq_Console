// components
import AppointmentCard from "./AppointmentCard";

const HomeAppointmentsList = ({ appointmentList }) => {
  return appointmentList && appointmentList.length > 0 ? (
    appointmentList.map((appointment) =>
      appointment.appointments.map((item, index) => (
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
