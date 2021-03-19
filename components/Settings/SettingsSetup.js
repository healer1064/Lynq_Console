// components
import SetupNotifications from "./SetupNotifications";
import SetupTable from "./SetupTable";

const SettingsSetup = () => {
  return (
    <div className="setup-wrp">
      <SetupTable />
      <SetupNotifications />
    </div>
  );
};

export default SettingsSetup;
