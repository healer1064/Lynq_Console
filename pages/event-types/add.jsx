// libraries
import Head from "next/head";

// components
import SettingsEventTypeAdd from "../../components/Settings/SettingsEventTypeAdd";

export default function EventTypesAdd() {
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
        <SettingsEventTypeAdd />
      </div>
    </>
  );
}
