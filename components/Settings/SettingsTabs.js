// libraries
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Settings = ({ setTab, tab }) => {
  // const [mobileView, setMobileView] = useState(tab);
  const router = useRouter();

  // useEffect(() => {
  //   if (mobileView === "setup") {
  //     router.push("/settings/setup");
  //   }
  //   if (mobileView === "eventtype") {
  //     router.push("/settings/event-type");
  //   }
  //   if (mobileView === "eventtypeedit") {
  //     router.push("/settings/event-type-edit");
  //   }
  //   if (mobileView === "callsync") {
  //     router.push("/settings/call-sync");
  //   }
  // }, [mobileView]);

  return (
    <>
      <div className="settings-types">
        <div
          onClick={() => setTab("setup")}
          className={`option ${tab === "setup" && "active"}`}
        >
          Set Up
        </div>
        <div
          onClick={() => setTab("eventtype")}
          className={`option ${
            (tab === "eventtype" || tab === "eventtypeedit") && "active"
          }`}
        >
          Event Type
        </div>
        <div
          onClick={() => setTab("callsync")}
          className={`option ${tab === "callsync" && "active"}`}
        >
          Call Sync
        </div>
      </div>
      <div className="settings-types__mobile">
        <select onChange={(e) => setTab(e.target.value)} value={tab}>
          <option value="setup">Set Up</option>
          <option value="eventtype">Event Type</option>
          <option value="callsync">Call Sync</option>
        </select>
      </div>
    </>
  );
};

export default Settings;
