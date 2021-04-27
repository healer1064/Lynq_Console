// libraries
import Head from "next/head";

// components
import Leftbar from "../../components/Leftbar";
import Navbar from "../../components/Navbar";
import SettingsEventTypeAsync from "../../components/Settings/SettingsEventTypeAsync";

export default function Settings() {
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
      <Navbar active="settings" />
      <div className="page-wrp">
        <Leftbar active="eventtypes" />
        <div className="content-wrp">
          <br />
          <SettingsEventTypeAsync />
        </div>
      </div>
    </>
  );
}
