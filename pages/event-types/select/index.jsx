// libraries
import Head from "next/head";

// components
import SettingsEventTypeSelect from "../../../components/Settings/SettingsEventTypeSelect";

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
      <div className="content-wrp">
        <br />
        <br />
        <SettingsEventTypeSelect />
      </div>
    </>
  );
}