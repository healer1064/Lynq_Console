// libraries
import Head from "next/head";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import AppointmentNewShare from "../../components/AppointmentNew/AppointmentNewShare";
import AppointmentNewButtons from "../../components/AppointmentNew/AppointmentNewButtons";
import AppointmentNewTime from "../../components/AppointmentNew/AppointmentNewTime";

export default function AppointmentNew() {
  return (
    <>
      <Head>
        <title>New Appointment</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className="page-wrp">
        <Leftbar active="appointments" />
        <div className="content-wrp">
          <div className="appointment-new">
            <h2>Appointment</h2>
            <label>
              <strong>Event Type</strong>
              <select name="" id=""></select>
            </label>
            <label>
              <strong>Duration (in minutes)</strong>
              <input type="text" placeholder="Example: 120 Min" />
            </label>
            <label className="small">
              <strong>Price</strong>
              <input type="text" />
            </label>
            <label className="small">
              <strong>Day</strong>
              <select name="" id=""></select>
            </label>
            <strong>Time</strong>
            <AppointmentNewTime />
            <AppointmentNewShare />
            <AppointmentNewButtons />
          </div>
        </div>
      </div>
    </>
  );
}
