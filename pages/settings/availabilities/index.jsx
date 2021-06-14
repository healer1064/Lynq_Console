// libraries
import Head from "next/head";

// components
import SettingsSetup from "../../../components/Settings/SettingsSetup";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings Availabilities | Lynq</title>
      </Head>
      <div className="content-wrp">
        <br />
        <SettingsSetup />
      </div>
    </>
  );
}
