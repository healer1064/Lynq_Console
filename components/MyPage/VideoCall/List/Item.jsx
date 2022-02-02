// libraries
import { useState, useLayoutEffect } from "react";
import moment from "moment-timezone";
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

// helpers
import { isBefore } from "@/utils/helpers/dates";

// components
import InnerItem from "@/components/Home/List/InnerItem";

const Item = ({ data, refetchResponse }) => {
  // state
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(true);

  const { date, appointments } = data;

  useLayoutEffect(() => {
    setStatus(isBefore(date));
  }, []);

  const sortList = (list) => {
    return list.sort(
      (a, b) =>
        moment(a.starting_date ? a.starting_date : a.date) -
        moment(b.starting_date ? b.starting_date : b.date),
    );
  };

  const liveSessions = appointments.filter((item) => "activity_name" in item);
  const masterclasses = appointments.filter(
    (item) => !item.hasOwnProperty("activity_name"),
  );

  return (
    <div
      className={`${styles.item_wrap} ${status ? "" : styles.inactive} ${
        open ? styles.active : ""
      } ${!status && open ? styles.inactive_active : ""}
      `}
    >
      <div
        onClick={() => {
          appointments && setOpen(!open);
        }}
        className={styles.item}
      >
        <div
          className={styles.det}
          style={{
            fontWeight: status ? "600" : "400",
          }}
        >
          {moment(date).format("dddd")}
          <div className={styles.line}></div>
          {moment(date).format("MMMM DD, YYYY")}
          <div className={styles.line}></div>
          <b>
            {liveSessions.length > 0 &&
              `${liveSessions.length} ${
                liveSessions.length == 1 ? "Live session" : "Live sessions"
              }${masterclasses.length > 0 ? "," : ""}`}{" "}
            {masterclasses.length > 0 &&
              `${masterclasses.length} ${
                masterclasses.length == 1 ? "Masterclass" : "Masterclasses"
              }`}
          </b>
        </div>
        <div className={styles.arrow}>
          <svg
            width='14'
            height='12'
            viewBox='0 0 14 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M7 12L0.0717964 0L13.9282 0L7 12Z' fill='#7E88F4' />
          </svg>
        </div>
      </div>
      {open && appointments && (
        <div style={{ width: "100%" }}>
          {sortList(appointments).map((data, index) => (
            <InnerItem
              key={index}
              data={data}
              refetchResponse={refetchResponse}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Item;
