import { useRouter } from "next/router";

// icons
import { GoPrimitiveDot } from "react-icons/go";

const SettingsEventTypeSelect = () => {
  // router
  const router = useRouter();

  return (
    <div className="settings-event-type-select">
      <p>Select the type of event</p>
      <button onClick={() => router.push("/event-types/add")}>
        <GoPrimitiveDot /> 1:1 Live video call
      </button>
      <button onClick={() => router.push("event-types/add-async")}>
        <GoPrimitiveDot /> 1:1 Asynchronous video call
      </button>
    </div>
  );
};

export default SettingsEventTypeSelect;
