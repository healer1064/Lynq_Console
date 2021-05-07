// libraries
import Head from "next/head";

// components
import SettingsEventTypeAsync from "../../../components/Settings/SettingsEventTypeAsync";

export default function AsyncAdd() {
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
      <div className="content-wrp">
        <br />
        <SettingsEventTypeAsync />
      </div>
    </>
  );
}
