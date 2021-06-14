// libraries
import moment from "moment";

// styles
import styles from "./styles.module.sass";

const Item = ({ data }) => {
  return (
    <div
      key={index}
      className={`${styles.request_drawer_item} ${
        !data.activity_name
          ? styles.yellow
          : data.status === "CONFIRMED"
          ? styles.blue
          : styles.red
      }`}
    >
      <div className={styles.title}>
        {data.activity_name ? data.activity_name : data.summary}
      </div>
      <div className={styles.det}>
        {moment(item.starting_date).format("ddd, MMM DD, YYYY")}
        <div className={styles.line}></div>
        <b>
          {moment(item.starting_date).format("hh:mm a")} -
          {moment(item.ending_date).format("hh:mm a")}
        </b>
        <div className={styles.line}></div>
        <b>
          {item.activity_name
            ? item.session_duration
            : moment(item.ending_date).diff(
                moment(item.starting_date),
                "minutes"
              )}{" "}
          mins
        </b>
      </div>
      {!item.activity_name && (
        <>
          <br />
          <span>Booking from Google Calendar</span>
        </>
      )}
    </div>
  );
};

export default Item;
