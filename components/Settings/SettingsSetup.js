// libraries
import { useState, useContext, useEffect } from "react";

// context
import ProfileContext from "../../context/profile";

// components
import SetupNotifications from "./SetupNotifications";
import SetupTable from "./SetupTable";

const SettingsSetup = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);

  const getWorkingSlots = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    const response = await fetch(
      `https://api.lynq.app/account/working-slots?t=${token}`,
      config
    );
    const data = await response.json();

    setData(data);
  };

  useEffect(() => {
    if (token) getWorkingSlots();
  }, [token]);

  console.log(data);

  return (
    <div className="setup-wrp">
      <SetupTable />
      <SetupNotifications />
    </div>
  );
};

export default SettingsSetup;
