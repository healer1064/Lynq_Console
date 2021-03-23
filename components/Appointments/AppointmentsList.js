import { useEffect, useState } from "react";

// components
import AppointmentsListItem from "./AppointmentsListItem";

const AppointmentsList = ({ appointmentList }) => {
  return appointmentList.length === 0 ? (
    <div className="no-appointments">
      <p>No appointments to show</p>
    </div>
  ) : (
    <div className="appointments-col">
      {appointmentList.map((item, index) => {
        return <AppointmentsListItem data={item} key={index} />;
      })}
    </div>
  );
};

export default AppointmentsList;
