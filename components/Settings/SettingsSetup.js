// components
import SetupNotifications from "../Setup/SetupNotifications";
import SetupTable from "../Setup/SetupTable";

const SettingsSetup = () => {
  return (
    <div className="setup-wrp">
      <SetupTable />
      <SetupNotifications />
    </div>
  );
};

export default SettingsSetup;
