import { useState, useEffect } from "react";
import { FaGlobeAmericas } from "react-icons/fa";

// components
import TimezoneDropdown from "./TimezoneDropdown";

const SetupNotifications = ({ delayedBookingHours, data, token }) => {
  const [delayBooking, setDelayBooking] = useState(
    delayedBookingHours == null || delayedBookingHours == ""
      ? "0"
      : delayedBookingHours
  );
  const [timezone, setTimeZone] = useState(data.timezone);

  useEffect(() => {
    if (token) {
      updateProfile();
    }
  }, [delayBooking, timezone]);

  const updateProfile = () => {
    const _reqData = { ...data, delay_booking_hours: delayBooking, timezone };

    async function update() {
      const response = await fetch(
        `https://api.lynq.app/account/public-profile?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_reqData),
        }
      );

      return await response;
    }

    update()
      .then((res) => {
        console.log("res", res.json());
        if (res.status !== 200) {
          console.log("public profile update error", res);
          toast.error("An error has occurred");
        }
      })
      .catch((err) => {
        console.log("error", err);
        toast.error("An error has occurred");
      });
  };

  return (
    <div className="setup-notifications">
      <div className="setup-notifications__card">
        <div className="title">
          <img src="/img/notifications-buffers.svg" alt="" />
          <strong>Buffers</strong>
        </div>
        <span>5 min before event</span>
      </div>
      <div className="setup-notifications__card">
        <div className="title">
          <img src="/img/notifications-reminders.svg" alt="" />
          <strong>Reminders</strong>
        </div>
        <span>24 hours before event</span>
        <span>1 hour before event</span>
      </div>
      <div className="setup-notifications__card">
        <div className="title">
          <img
            src="/img/not-allow.svg"
            alt=""
            style={{ height: "17px", width: "17px" }}
          />
          <strong>Do Not Allow Clients To</strong>
        </div>
        <span className="donot-allow-clients">
          Schedule fewer than{" "}
          <input
            type="number"
            value={delayBooking}
            onChange={(e) => setDelayBooking(e.target.value)}
          />{" "}
          hours in advance
        </span>
      </div>
      <div className="setup-notifications__card">
        <div className="title">
          <FaGlobeAmericas
            color="#7E88F4"
            style={{ height: "17px", width: "17px" }}
          />
          <strong>Select Timezone</strong>
        </div>
        <span style={{ width: "100%" }} className="donot-allow-clients">
          <TimezoneDropdown setState={setTimeZone} state={timezone} />
        </span>
      </div>
    </div>
  );
};

export default SetupNotifications;
