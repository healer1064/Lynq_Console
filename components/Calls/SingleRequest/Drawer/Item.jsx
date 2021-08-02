// libraries
import moment from "moment";

// styles
import styles from "./styles.module.sass";

const Item = ({ data }) => {
  return (
    <div
      className={`${styles.request_drawer_item} ${
        !data.summary == "not_google_calendar"
          ? styles.yellow
          : data.status === "CONFIRMED" || data.attendees
          ? styles.blue
          : styles.red
      }`}
    >
      <div className={styles.title}>
        {data.summary === "not_google_calendar"
          ? `${data.session_duration} mins session`
          : data.attendees
          ? data.name
          : data.summary}
      </div>
      <div className={styles.det}>
        {moment(data.starting_date || data.date).format("ddd, MMM DD, YYYY")}
        <div className={styles.line}></div>
        <b>
          {moment(data.starting_date || data.date).format("hh:mm a")} -
          {moment(
            data.ending_date || moment(data.date).add(data.duration, "minutes"),
          ).format("hh:mm a")}
        </b>
        <div className={styles.line}></div>
        <b>
          {data.activity_name
            ? data.session_duration
            : data.attendees
            ? data.duration
            : moment(data.ending_date).diff(
                moment(data.starting_date),
                "minutes",
              )}{" "}
          mins
        </b>
      </div>
      {data.summary !== "not_google_calendar" ||
        (data.attendees && (
          <>
            <br />
            <span>Booking from Google Calendar</span>
          </>
        ))}
    </div>
  );
};

export default Item;
