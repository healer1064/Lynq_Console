// libs
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../../context/profile";

import Loading from "../../components/common/Loading";
import PageLoading from "../../components/common/PageLoading";
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";

const SettingsCallSync = () => {
  // contect
  const { profile } = useContext(ProfileContext);
  const [isConnected, setIsConnected] = useState(true);
  // const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // const toggleSuccess = () => {
  //   setSuccess(!success);
  // };

  useEffect(() => {
    if (profile) {
      fetchStatus();
    }
  }, [profile]);

  const fetchStatus = async () => {
    setPageLoading(true);
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        `https://cal.lynq.app/status?uid=${profile.id}`,
        config
      );
      const _data = await response.json();

      setIsConnected(_data.connected);
      setPageLoading(false);
    } catch (err) {
      setPageLoading(false);
      toast.error("Error, Failed to Fetch Request List!!!");
    }
  };

  const disconnectCal = () => {
    setLoading(true);
    async function accept() {
      const response = await fetch(
        `https://cal.lynq.app/toggle?uid=${profile.id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return await response;
    }

    accept()
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setIsConnected(res.connected);
        } else {
          toast.error("Error, Failed To Disconnect Calendar");
        }
      })
      .catch(() => {
        toast.error("Error, Failed To Disconnect Calendar");
        setLoading(false);
      });
  };

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
        <Leftbar active="cal-sync" />
        <div className="content-wrp">
          <>
            <ToastContainer />
            <Fade duration={1000}>
              <div className="call-sync__wrp">
                {pageLoading ? (
                  <div style={{ height: "40vh", alignSelf: "center" }}>
                    <PageLoading />
                  </div>
                ) : (
                  <>
                    <br />
                    <br />
                    <div className="title">
                      You can connect your calendar with Lynq.
                    </div>
                    <div className="call-sync__calendar">
                      <img src="/img/google-calendar.svg" alt="" />
                      <a
                        href={
                          !isConnected &&
                          `https://cal.lynq.app/?uid=${profile.id}`
                        }
                        target="_blank"
                        onClick={() => isConnected && disconnectCal()}
                        style={{
                          textTransform: "capitalize !important",
                          textDecoration: "none",
                          position: "relative",
                        }}
                      >
                        {loading && <Loading />}
                        {isConnected ? "Disconnect" : "Connect"}
                      </a>
                    </div>
                    <span className="btm__txt">
                      <b>Two-way sync</b> - Add Lynq appointments to your
                      outside calendar and add events from your outside calendar
                      to Lynq, blocking off your availability.
                      <br />
                      <br />
                      Appointments made in Lynq should be edited in Lynq; The
                      system will not recognize changes made in outside
                      calendars. Events synced into Lynq from outside calendars
                      must be edited in the outside calendar ; they cannot be
                      edited in Lynq.
                    </span>
                  </>
                )}
              </div>
            </Fade>
          </>
        </div>
      </div>
    </>
  );
};

export default SettingsCallSync;
