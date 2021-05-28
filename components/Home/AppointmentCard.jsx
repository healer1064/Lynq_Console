// libraries
import { useContext, useState, useEffect } from "react";
import moment from "moment-timezone";
import Link from "next/link";

// context
import ProfileContext from "../../context/profile";
import { dateIsBetween } from "../../utils/DateHelper";

const AppointmentCard = ({ data }) => {
  // states
  const [status, setStatus] = useState(true);

  // context
  const { slugData } = useContext(ProfileContext);

  useEffect(() => {
    let checkStatus = dateIsBetween(data.starting_date, data.ending_date);

    setStatus(checkStatus);
  }, []);

  return (
    <div
      className={`appointments-col__event ${
        !status ? "gray" : data.activity_name ? "blue" : "yellow"
      }`}
    >
      <div className="title">
        {data.activity_name ? data.activity_name : data.summary}
      </div>
      <div className="det">
        {moment(data.starting_date).format("dddd, MMMM DD, YYYY")}
        <div className="line"></div>
        <b>
          {moment(data.starting_date).format("hh:mm a")} -{" "}
          {moment(data.ending_date).format("hh:mm a")}
        </b>
        <div className="line"></div>
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
      {data.activity_name && (
        <div className="client">
          Client: {data.first_name + " " + data.last_name}
          <div className="line"></div>
          {data.email}
        </div>
      )}
      {!data.activity_name && (
        <>
          <br />
          <span>Booking from Google Calendar</span>
        </>
      )}
      {!status && <span className="past-event">Past Event</span>}
      {status && (
        <>
          {data.activity_name && (
            <div style={{ marginTop: "1rem" }}>
              <Link href={`/appointments/${data.id}`}>
                <a className="btnCancel">Manage Session</a>
              </Link>
              <Link
                href={`https://us.lynq.app/${slugData?.slug}/teacher/${data.id}`}
              >
                <a target="_blank" className="btnGoto">
                  Start the video
                </a>
              </Link>
              {data?.status?.toLowerCase().includes("awaiting-payment") && (
                <span className="payment-not-paid">
                  This session has not been paid by your client.{" "}
                  <Link href={`/appointments/${data.id}`}>
                    See details here
                  </Link>
                </span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AppointmentCard;
