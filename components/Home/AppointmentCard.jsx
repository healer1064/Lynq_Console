// libraries
import { useContext } from "react";
import moment from "moment";
import Link from "next/link";

// context
import ProfileContext from "../../context/profile";

const AppointmentCard = ({ data }) => {
  const { slugData } = useContext(ProfileContext);

  return (
    <div className={`appointments-col__event blue`}>
      <div className="title">{data.activity_name}</div>
      <div className="det">
        {moment(data.starting_date).format("dddd, MMMM DD, YYYY")}
        <div className="line"></div>
        <b>
          {moment(data.starting_date).format("hh:mm a")} -{" "}
          {moment(data.starting_date)
            .add(data.session_duration, "minutes")
            .format("hh:mm a")}
        </b>
        <div className="line"></div>
        <b>{data.session_duration} mins</b>
      </div>
      <div className="client">
        Client: {data.first_name + " " + data.last_name}
        <div className="line"></div>
        {data.email}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Link href={`/appointments/${data.id}`}>
          <a className="btnCancel">Manage Session</a>
        </Link>
        <Link href={`https://us.lynq.app/${slugData?.slug}/${data.id}`}>
          <a target="_blank" className="btnGoto">
            Start the video
          </a>
        </Link>
        {data.status.toLowerCase().includes("awaiting-payment") && (
          <span className="payment-not-paid">
            This session has not been paid by your client.{" "}
            <Link href={`/appointments/${data.id}`}>See details here</Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
