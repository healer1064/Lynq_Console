// icons
import { GoPrimitiveDot } from "react-icons/go";

const SettingsEventTypeSelect = ({ setTab }) => {
  return (
    <div className="settings-event-type-select">
      <p>Select the type of event</p>
      <button onClick={() => setTab("eventtypeadd")}>
        <GoPrimitiveDot /> 1:1 Live video call
      </button>
      <button onClick={() => setTab("eventtypeasync")}>
        <GoPrimitiveDot /> 1:1 Asynchronous video call
      </button>
    </div>
  );
};

export default SettingsEventTypeSelect;
