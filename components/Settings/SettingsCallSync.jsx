// libs
import { useContext } from "react";
import Fade from "react-reveal/Fade";

// context
import ProfileContext from "../../context/profile";

const SettingsCallSync = () => {
  // contect
  const { profile } = useContext(ProfileContext);

  return (
    <Fade duration={1000}>
      <div className="call-sync__wrp">
        <div className="title">You can connect your calendar with Lynq.</div>
        <div className="call-sync__calendar">
          <img src="/img/google-calendar.svg" alt="" />
          <a href={`https://cal.lynq.app/?uid=${profile.id}`} target="_blank">
            Connect
          </a>
        </div>
        <span className="btm__txt">
          <b>Two-way sync</b> - Add Lynq appointments to your outside calendar
          and add events from your outside calendar to Lynq, blocking off your
          availability.
          <br />
          <br />
          Appointments made in Lynq should be edited in Lynq; The system will
          not recognize changes made in outside calendars. Events synced into
          Lynq from outside calendars must be edited in the outside calendar ;
          they cannot be edited in Lynq.
        </span>
      </div>
    </Fade>
  );
};

export default SettingsCallSync;
