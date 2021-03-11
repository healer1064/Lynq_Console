// libraries
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Settings = ({ active }) => {
  const [mobileView, setMobileView] = useState(active);
  const router = useRouter();

  useEffect(() => {
    if (mobileView === "setup") {
      router.push("/settings/setup");
    }
    if (mobileView === "eventtype") {
      router.push("/settings/event-type");
    }
    if (mobileView === "eventtypeedit") {
      router.push("/settings/event-type-edit");
    }
    if (mobileView === "callsync") {
      router.push("/settings/call-sync");
    }
  }, [mobileView]);

  return (
    <>
      <div className="settings-types">
        <div
          onClick={() => router.push("/settings/setup")}
          className={`option ${active === "setup" && "active"}`}
        >
          Set Up
        </div>
        <div
          onClick={() => router.push("/settings/event-type")}
          className={`option ${
            (active === "eventtype" || active === "eventtypeedit") && "active"
          }`}
        >
          Event Type
        </div>
        <div
          onClick={() => router.push("/settings/call-sync")}
          className={`option ${active === "callsync" && "active"}`}
        >
          Call Sync
        </div>
      </div>
      <div className="settings-types__mobile">
        <select
          onChange={(e) => setMobileView(e.target.value)}
          value={mobileView}
        >
          <option value="setup">Set Up</option>
          <option value="eventtype">Event Type</option>
          <option value="callsync">Call Sync</option>
        </select>
      </div>
    </>
  );
};

export default Settings;
