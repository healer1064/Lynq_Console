// libraries
import Head from "next/head";
import { useState } from "react";
import Fade from "react-reveal/Fade";

// components
import Navbar from "../../components/Navbar";
import AppointmentsTop from "../../components/Appointments/AppointmentsTop";
import Leftbar from "../../components/Leftbar";
import AppointmentsList from "../../components/Appointments/AppointmentsList";
import Requests from "../../components/Appointments/Requests";

// fake data
import { appointments } from "../../utils/data/appointmentsFake";

export default function Appointments() {
  const [tabIndex, setTabIndex] = useState(1);

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
          <Fade>
            <div className="content-tabs">
              <h3
                onClick={() => setTabIndex(1)}
                className={tabIndex === 1 && "active"}
              >
                Scheduled
              </h3>
              <h3
                onClick={() => setTabIndex(2)}
                className={tabIndex === 2 && "active"}
              >
                Request
              </h3>
            </div>
            {tabIndex === 1 ? (
              <>
                <Fade duration={1200}>
                  <div>
                    <AppointmentsTop />
                    <AppointmentsList data={appointments} />
                  </div>
                </Fade>
              </>
            ) : (
              <>
                <Requests />
              </>
            )}
          </Fade>
        </div>
      </div>
    </>
  );
}
