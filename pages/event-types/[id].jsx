// libraries
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";

// context
import ProfileContext from "../../context/profile";

// components
import Leftbar from "../../components/Leftbar";
import Navbar from "../../components/Navbar";
import SettingsEventTypeEdit from "../../components/Settings/SettingsEventTypeEdit";
import PageLoading from "../../components/common/PageLoading";

export default function EventTypeEdit() {
  // state
  const [data, setData] = useState(null);

  // context
  const { token } = useContext(ProfileContext);

  // router
  const router = useRouter();

  const { id } = router.query;

  const getEventTypes = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    const response = await fetch(
      `https://api.lynq.app/account/event-type?t=${token}`,
      config
    );
    const data = await response.json();

    const singleEventType = data.find((et) => et.id === id);

    setData(singleEventType);
  };

  useEffect(() => {
    if (token) {
      getEventTypes();
    }
  }, [token]);

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
          {data ? <SettingsEventTypeEdit eventType={data} /> : <PageLoading />}
        </div>
      </div>
    </>
  );
}
