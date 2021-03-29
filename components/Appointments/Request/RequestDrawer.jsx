import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import Fade from "react-reveal/Fade";

// styles
import "antd/dist/antd.css";
import styles from "./Request.module.css";

// utils
import { fullDate, getDuration, getTime } from "../../../utils/dates";
import moment from "moment";

const RequestDrawer = ({ isOpen, toggle, apt, day, thatDate }) => {
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    var groupArrays = [];

    if (apt.length > 0) {
      const groups = apt.reduce((groups, appointment) => {
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

    const filteredArray = groupArrays.filter((i) => {
      var currentDate = moment(thatDate).format("YYYY-MM-DD");
      var date = moment(i.date).format("YYYY-MM-DD");
      return date == currentDate;
    });

    setAppointments(filteredArray);
  }, []);

  return (
    <Drawer
      width={440}
      title={day}
      placement="right"
      closable={true}
      onClose={toggle}
      visible={isOpen}
    >
      <Fade duration={600}>
        <>
          {!appointments ? (
            <h1>Loading...</h1>
          ) : appointments.length == 0 ? (
            <div>
              <h3>No Appointments For Today</h3>
            </div>
          ) : (
            appointments.map((i) =>
              i.appointments.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.request_drawer_item} ${styles.blue}`}
                >
                  <div className={styles.title}>
                    (No field in backend for event type)
                  </div>
                  <div className={styles.det}>
                    {moment(item.starting_date).format("ddd, MMM DD, YYYY")}
                    <div className={styles.line}></div>
                    <b>
                      {moment(item.starting_date).format("hh:mm a")} -
                      "duration"
                    </b>
                    <div className={styles.line}></div>
                    <b>duration</b>
                  </div>
                </div>
              ))
            )
          )}
        </>
      </Fade>
    </Drawer>
  );
};

export default RequestDrawer;
