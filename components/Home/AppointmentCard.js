// utils
import { getTime, fullDate, getDuration } from "../../utils/dates";

const AppointmentCard = ({ data, toggle }) => {
  return (
    // <div className={`appointments-col__event ${data.type like blue or red}`}>
    <div className={`appointments-col__event blue`}>
      <div className="title">Test Name (Not coming from backend)</div>
      <div className="det">
        {fullDate(data.starting_date)}
        <div className="line"></div>
        <b>
          {getTime(data.starting_date)} - {getTime(data.ending_date)}
        </b>
        <div className="line"></div>
        <b>{getDuration(data.starting_date, data.ending_date)}</b>
      </div>
      <div className="client">
        Client: {data.first_name + " " + data.last_name}
        <div className="line"></div>
        {data.email}
      </div>
      {/* {data.type === "blue" && ( */}
      <button className="btnCancel" onClick={() => toggle(data.id)}>
        Cancel Appointment
      </button>
      {/* )} */}
    </div>
  );
};

export default AppointmentCard;
