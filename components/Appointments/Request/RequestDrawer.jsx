import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import Fade from "react-reveal/Fade";

// styles
import "antd/dist/antd.css";
import styles from "./Request.module.css";

// utils
import { fullDate, getDuration, getTime } from "../../../utils/dates";

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
      var currentDate = new Date(thatDate).getDate();
      var date = new Date(i.date).getDate();
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
                  {fullDate(item.starting_date)}
                  <div className={styles.line}></div>
                  <b>
                    {getTime(item.starting_date)} - {getTime(item.ending_date)}
                  </b>
                  <div className={styles.line}></div>
                  <b>{getDuration(item.starting_date, item.ending_date)} Min</b>
                </div>
              </div>
            ))
          )
        )}
      </Fade>
    </Drawer>
  );
};

export default RequestDrawer;
