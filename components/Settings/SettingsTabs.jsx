// libraries
import { useRouter } from "next/router";

const Settings = ({ setTab, tab }) => {
  const router = useRouter();

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
            (tab === "eventtype" ||
              tab === "eventtypeedit" ||
              tab === "eventtypeadd" ||
              tab === "eventtypeasync" ||
              tab === "eventtypeselect") &&
            "active"
          }`}
        >
          Event Type
        </div>
        <div
          onClick={() => setTab("calsync")}
          className={`option ${tab === "calsync" && "active"}`}
        >
          Cal Sync
        </div>
      </div>
      <div className="settings-types__mobile">
        <select onChange={(e) => setTab(e.target.value)} value={tab}>
          <option value="setup">Set Up</option>
          <option value="eventtype">Event Type</option>
          <option value="calsync">Cal Sync</option>
        </select>
      </div>
    </>
  );
};

export default Settings;
