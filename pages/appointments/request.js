// libraries
import Head from "next/head";
import { useState } from "react";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import AppointmentsNewClearModal from "../../components/Appointments/AppointmentsNewClearModal";
import RequestDrawer from "../../components/Appointments/Request/RequestDrawer";

export default function AppointmentRequest() {
  // state
  const [modalShow, setModalShow] = useState(false);

  const toggle = () => setModalShow(!modalShow);

  return (
    <>
      <Head>
        <title>Appointment Request</title>
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
          <div className="appointment-request">
            {modalShow && (
              // <AppointmentsNewClearModal setModalShow={setModalShow} />
              <RequestDrawer isOpen={modalShow} toggle={toggle} />
            )}
            <a href="#" className="appointment-request__back">
              Back
            </a>
            <h2>Appointment Request</h2>
            <span className="received__time">
              Received 12 hours, 31 min ago
            </span>
            <div className="info__col">
              <strong>Event type</strong>
              <p>Full Moon Meditation</p>
            </div>
            <div className="info__col">
              <strong>Duration</strong>
              <p>60 min</p>
            </div>
            <div className="info__col">
              <strong>Price</strong>
              <p>$50</p>
            </div>
            <div className="info__col">
              <strong>Day</strong>
              <p>Wednesday, February 22, 2021</p>
              <span className="see__day" onClick={() => setModalShow(true)}>
                See you how your day look like
              </span>
            </div>
            <div className="info__col">
              <strong>Time</strong>
              <p>09:00 AM</p>
            </div>
            <div className="info__col">
              <strong>Appointment made by</strong>
              <p>Bob.iger@disney.com</p>
            </div>
            <div className="appointment-request__btns">
              <button className="reject">REJECT</button>
              <button className="accept">ACCEPT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
