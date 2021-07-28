// libraries
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { getSlotsReq } from "@/utils/requests/settings/availabilities";
import { getProfileReq } from "@/utils/requests/public-profile";

// components
import PageLoading from "@/components/common/PageLoading";
import Notifications from "../Notifications";
import Table from "../Table";

const SettingsSetup = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      getProfileReq(token)
        .then((res) => {
          setProfile(res);
        })
        .catch(() => toast.error("Failed to get profile data."));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getSlotsReq(token)
        .then((res) => {
          setData(res);
        })
        .catch(() => toast.error("Failed to get availabilities slots."));
    }
  }, [token, success]);

  const toggleSuccess = () => {
    setSuccess((prevState) => !prevState);
  };

  return (
    <div className={styles.content}>
      {!profile ? (
        <PageLoading />
      ) : (
        <>
          <Table data={data} toggleSuccess={toggleSuccess} success={success} />
          <Notifications
            data={profile}
            delayedBookingHours={profile.delay_booking_hours}
            token={token}
            toggleSuccess={toggleSuccess}
          />
        </>
      )}
    </div>
  );
};

export default SettingsSetup;
