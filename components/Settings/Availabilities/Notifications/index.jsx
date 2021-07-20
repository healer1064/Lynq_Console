// libraries
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// icons
import { FaGlobeAmericas } from "react-icons/fa";

// requests
import { postProfileReq } from "@/utils/requests/public-profile";

// components
import TimezoneDropdown from "./TimezoneDropdown";

const SetupNotifications = ({
  delayedBookingHours,
  data,
  token,
  toggleSuccess,
}) => {
  // states
  const [delayBooking, setDelayBooking] = useState(
    delayedBookingHours == null || delayedBookingHours == ""
      ? "0"
      : delayedBookingHours,
  );
  const [timezone, setTimeZone] = useState(data.timezone);

  useEffect(() => {
    if (token || timezone) {
      updateProfile();
    }
  }, [delayBooking, timezone]);

  const updateProfile = () => {
    const { name, public_image, slug, tags, bio } = data;
    const reqData = {
      name,
      public_image,
      slug,
      delay_booking_hours: delayBooking,
      timezone,
      bio,
      tags,
    };
    postProfileReq(token, reqData)
      .then(() => toggleSuccess())
      .catch(() => {
        toast.error("Failed to update timezone.");
      });
  };

  return (
    <div className={styles.notifications}>
      <div className={styles.card}>
        <div className={styles.title}>
          <img src='/img/notifications-buffers.svg' alt='' />
          <strong>Buffers</strong>
        </div>
        <span>5 min before event</span>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>
          <img src='/img/notifications-reminders.svg' alt='' />
          <strong>Reminders</strong>
        </div>
        <span>24 hours before event</span>
        <span>1 hour before event</span>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>
          <img
            src='/img/not-allow.svg'
            alt=''
            style={{ height: "17px", width: "17px" }}
          />
          <strong>Do Not Allow Clients To</strong>
        </div>
        <span className={styles.do_not_allow_clients}>
          Schedule fewer than{" "}
          <input
            type='number'
            value={delayBooking}
            onChange={(e) => setDelayBooking(e.target.value)}
          />{" "}
          hours in advance
        </span>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>
          <FaGlobeAmericas
            color='#7E88F4'
            style={{ height: "17px", width: "17px" }}
          />
          <strong>Select Timezone</strong>
        </div>
        <span style={{ width: "100%" }} className={styles.do_not_allow_clients}>
          <TimezoneDropdown setState={setTimeZone} state={timezone} />
        </span>
      </div>
    </div>
  );
};

export default SetupNotifications;
