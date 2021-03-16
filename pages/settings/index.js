// libraries
import Head from "next/head";
import { useState } from "react";

// components
import Leftbar from "../../components/Leftbar";
import Navbar from "../../components/Navbar";
import SettingsTabs from "../../components/Settings/SettingsTabs";
import SettingsSetup from "../../components/Settings/SettingsSetup";
import SettingsEventType from "../../components/Settings/SettingsEventType";
import SettingsCallSync from "../../components/Settings/SettingsCallSync";

// fake data
import { eventsData } from "../../utils/data/settingsFake";
import SettingsEventTypeEdit from "../../components/Settings/SettingsEventTypeEdit";

export default function Settings() {
  // states
  const [tab, setTab] = useState("setup");

  return (
    <>
      <Head>
        <title>Settings</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className="page-wrp">
        <Leftbar active="settings" />
        <div className="content-wrp">
          <SettingsTabs active="setup" setTab={setTab} tab={tab} />
          {tab === "setup" ? (
            <SettingsSetup />
          ) : tab === "eventtype" ? (
            <SettingsEventType data={eventsData} setTab={setTab} />
          ) : tab === "callsync" ? (
            <SettingsCallSync />
          ) : (
            <SettingsEventTypeEdit setTab={setTab} />
          )}
        </div>
      </div>
    </>
  );
}
