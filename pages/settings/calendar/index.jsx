// libs
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";

// context
import ProfileContext from "../../../context/profile";

import Loading from "../../../components/common/Loading";
import PageLoading from "../../../components/common/PageLoading";

const SettingsCallSync = () => {
  // contect
  const { profile } = useContext(ProfileContext);
  const [isConnected, setIsConnected] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

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

  return (
    <>
      <Head>
        <title>Settings Calendar | Lynq</title>
      </Head>
      <div className="content-wrp">
        <>
          <Fade duration={1000}>
            <div className="call-sync__wrp">
              {pageLoading && !profile ? (
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
                        !isConnected
                          ? `https://cal.lynq.app/?uid=${profile && profile.id}`
                          : `https://cal.lynq.app/disconnect?uid=${
                              profile && profile.id
                            }`
                      }
                      // target="_blank"
                      // onClick={() => isConnected && disconnectCal()}
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
                    <b>Two-way sync</b> - Add Lynq appointments to your outside
                    calendar and add events from your outside calendar to Lynq,
                    blocking off your availability.
                    <br />
                    <br />
                    Appointments made in Lynq should be edited in Lynq; The
                    system will not recognize changes made in outside calendars.
                    Events synced into Lynq from outside calendars must be
                    edited in the outside calendar ; they cannot be edited in
                    Lynq.
                  </span>
                </>
              )}
            </div>
          </Fade>
        </>
      </div>
    </>
  );
};

export default SettingsCallSync;
