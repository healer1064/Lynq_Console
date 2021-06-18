// libraries
import moment from "moment";

// styles
import styles from "./styles.module.sass";

const Item = ({ data }) => {
  return (
    <div
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
        {moment(data.starting_date).format("ddd, MMM DD, YYYY")}
        <div className={styles.line}></div>
        <b>
          {moment(data.starting_date).format("hh:mm a")} -
          {moment(data.ending_date).format("hh:mm a")}
        </b>
        <div className={styles.line}></div>
        <b>
          {data.activity_name
            ? data.session_duration
            : moment(data.ending_date).diff(
                moment(data.starting_date),
                "minutes"
              )}{" "}
          mins
        </b>
      </div>
      {!data.activity_name && (
        <>
          <br />
          <span>Booking from Google Calendar</span>
        </>
      )}
    </div>
  );
};

export default Item;
