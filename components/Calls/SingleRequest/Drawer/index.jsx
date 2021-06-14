// libraries
import { useEffect, useState } from "react";
import { Drawer } from "antd";

// components
import PageLoading from "@/components/common/PageLoading";
import EmptyData from "@/components/common/EmptyData";
import Item from "./Item";

const RequestDrawer = ({ isOpen, toggle, day, thatDate }) => {
  // states
  const [appointments, setAppointments] = useState([]);

  // useEffect(() => {
  //   var groupArrays = [];

  //   if (apt.length > 0) {
  //     const groups = apt.reduce((groups, appointment) => {
  //       const date = appointment.starting_date.split("T")[0];
  //       if (!groups[date]) {
  //         groups[date] = [];
  //       }
  //       groups[date].push(appointment);
  //       return groups;
  //     }, {});

  //     groupArrays = Object.keys(groups).map((date) => {
  //       return {
  //         date,
  //         appointments: groups[date],
  //       };
  //     });
  //   }

  //   const filteredArray = groupArrays.filter((i) => {
  //     var currentDate = moment(thatDate).format("YYYY-MM-DD");
  //     var date = moment(i.date).format("YYYY-MM-DD");
  //     return date == currentDate;
  //   });

  //   if (filteredArray.length > 0) {
  //     const sortedList = filteredArray[0].appointments.sort(
  //       (a, b) => new Date(b.starting_date) - new Date(a.starting_date)
  //     );

  //     setAppointments(sortedList);
  //   } else {
  //     setAppointments([]);
  //   }
  // }, []);

  return (
    <Drawer
      width={440}
      title={day}
      placement="right"
      closable={true}
      onClose={toggle}
      visible={isOpen}
    >
      {!appointments ? (
        <PageLoading />
      ) : appointments.length == 0 ? (
        <div>
          <EmptyData title="No appointments" />
        </div>
      ) : (
        appointments.map((item, index) => <Item key={index} data={item} />)
      )}
    </Drawer>
  );
};

export default RequestDrawer;
