// libraries
import { useContext } from "react";
import moment from "moment";
import Link from "next/link";

// context
import ProfileContext from "../../context/profile";

const AppointmentCard = ({ data, toggle }) => {
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

      <div>
        <button
          className="btnCancel"
          onClick={(e) => {
            e.stopPropagation();
            toggle(data.id);
          }}
        >
          Cancel Appointment
        </button>
        <button className="btnGoto">
          <a
            href={`https://us.lynq.app/${slugData.slug}/${data.id}`}
            target="_blank"
          >
            Goto Session
          </a>
        </button>
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
