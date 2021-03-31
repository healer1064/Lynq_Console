// libraries
import moment from "moment";
import Link from "next/link";

const AppointmentCard = ({ data, toggle }) => {
  return (
    <div className={`appointments-col__event blue`}>
      <div className="title">{data.summary}</div>
      <div className="det">
        {moment(data.starting_date).format("dddd, MMMM DD, YYYY")}
        <div className="line"></div>
        <b>
          {moment(data.starting_date).format("hh:mm a")} - Need duration from
          backend
        </b>
        <div className="line"></div>
        <b>No duration from backend</b>
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
