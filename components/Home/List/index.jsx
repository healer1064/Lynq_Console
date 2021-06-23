// libraries
import React from "react";

// components
import Item from "./Item";
import EmptyData from "@/components/common/EmptyData";

const HomeAppointmentsList = ({ list }) => {
  // sort list
  const sortList = (_list) => {
    return _list.sort(
      (a, b) => new Date(a.starting_date) - new Date(b.starting_date)
    );
  };

  return list && list.length > 0 ? (
    list.map((appointment) =>
      sortList(appointment.appointments).map((item, index) => (
        <Item key={index} data={item} />
      ))
    )
  ) : (
    <EmptyData title="No appointments for today" flag="home" />
  );
};

export default HomeAppointmentsList;
