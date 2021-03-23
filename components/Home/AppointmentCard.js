import { dayNames, monthNames } from "../../utils/dates";

const AppointmentCard = ({ data, toggle }) => {
  const getDuration = () => {
    const endDate = new Date(data.ending_date);
    const startDate = new Date(data.starting_date);

    var diff = (endDate.getTime() - startDate.getTime()) / 1000;
    diff /= 60;
    var dur = Math.abs(Math.round(diff));
    if (dur > 60) {
      return `${dur / 60} ${dur / 60 < 2 ? "hr" : "hrs"}`;
    } else {
      return `${dur} min`;
    }
  };

  function getTime(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  const fullDate = (dateString) => {
    const date = new Date(dateString);
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]}
     ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    // <div className={`appointments-col__event ${data.type}`}>
    <div className={`appointments-col__event blue`}>
      <div className="title">Test Name (Not coming from backend)</div>
      <div className="det">
<<<<<<< Updated upstream
        {data?.starting_date?.split("T")[0]}
=======
        {fullDate(data.starting_date)}
>>>>>>> Stashed changes
        <div className="line"></div>
        <b>
          {getTime(data.starting_date)} - {getTime(data.ending_date)}
        </b>
        <div className="line"></div>
        <b>{getDuration()}</b>
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
