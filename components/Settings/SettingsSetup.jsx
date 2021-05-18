// libraries
import { useState, useContext, useEffect } from "react";

// context
import ProfileContext from "../../context/profile";

// components
import SetupNotifications from "./SetupNotifications";
import SetupTable from "./SetupTable";
import PageLoading from "../common/PageLoading";

const SettingsSetup = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState(null);

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

  const getProfile = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "*/*",
        ContentType: "application/json",
      },
    };

    const response = await fetch(
      `https://api.lynq.app/account/public-profile?t=${token}`,
      config
    );

    const data = await response.json();
    setProfile(data);
  };

  const toggleSuccess = () => {
    setSuccess(!success);
  };

  useEffect(() => {
    if (token) {
      getWorkingSlots();
      getProfile();
    }
  }, [token, success]);

  return (
    <div className="setup-wrp">
      {!profile ? (
        <PageLoading />
      ) : (
        <>
          <SetupTable
            data={data}
            toggleSuccess={toggleSuccess}
            success={success}
          />
          <SetupNotifications
            data={profile}
            delayedBookingHours={profile.delay_booking_hours}
            token={token}
          />
        </>
      )}
    </div>
  );
};

export default SettingsSetup;
