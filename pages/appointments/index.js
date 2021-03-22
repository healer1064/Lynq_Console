// libraries
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import Fade from "react-reveal/Fade";

// components
import Navbar from "../../components/Navbar";
import AppointmentsTop from "../../components/Appointments/AppointmentsTop";
import Leftbar from "../../components/Leftbar";
import AppointmentsList from "../../components/Appointments/AppointmentsList";
import RequestList from "../../components/Appointments/Request/RequestList";
import PageLoading from "../../components/common/PageLoading";

// context
import ProfileContext from "../../context/profile";

// fake data
import { appointments } from "../../utils/data/appointmentsFake";
import fakedata from "../../utils/data";

export default function Appointments() {
  const { token, profile } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);
  const [tabIndex, setTabIndex] = useState(1);

  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token]);

  const fetchAppointments = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `http://reb00t.uc.r.appspot.com/account/appointments?t=${token}`,
      config
    );

    const _data = await response.json();

    setData(_data);
  };

  return (
    <>
      <Head>
        <title>Appointments</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar active="appointments" />
      <div className="page-wrp">
        <Leftbar active="appointments" />
        <div className="content-wrp">
          {!data ? (
            <PageLoading />
          ) : (
            <Fade>
              <div className="settings-types">
                <div
                  onClick={() => setTabIndex(1)}
                  className={`option ${tabIndex === 1 && "active"}`}
                >
                  Scheduled
                </div>
                <div
                  onClick={() => setTabIndex(2)}
                  className={`option ${tabIndex === 2 && "active"}`}
                >
                  Request
                </div>
              </div>
              {tabIndex === 1 ? (
                <>
                  <Fade duration={1200}>
                    <div>
                      <AppointmentsTop />
                      <AppointmentsList data={data} />
                    </div>
                  </Fade>
                </>
              ) : (
                <>
                  <RequestList requestList={fakedata.appointments.request} />
                </>
              )}
            </Fade>
          )}
        </div>
      </div>
    </>
  );
}
