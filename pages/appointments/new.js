// libraries
import Head from "next/head";
import { useState } from "react";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import AppointmentNewShare from "../../components/AppointmentNew/AppointmentNewShare";
import AppointmentNewButtons from "../../components/AppointmentNew/AppointmentNewButtons";
import AppointmentNewTime from "../../components/AppointmentNew/AppointmentNewTime";

export default function AppointmentNew() {
  // states
  const [eventType, setEventType] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState();
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [email, setEmail] = useState("");

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
      <Navbar active="appointments" />
      <div className="page-wrp">
        <Leftbar active="appointments" />
        <div className="content-wrp">
          <div className="appointment-new">
            <h2>Appointment</h2>
            <label>
              <strong>Event Type</strong>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option>Select Event Type</option>
                <option value="option 1">Option 1</option>
                <option value="option 2">Option 2</option>
                <option value="option 3">Option 3</option>
              </select>
            </label>
            <label>
              <strong>Duration (in minutes)</strong>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                type="text"
                placeholder="Example: 120 Min"
              />
            </label>
            <label className="small">
              <strong>Price</strong>
              <input
                type="number"
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label className="small">
              <strong>Day</strong>
              <select value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <strong>Time</strong>
            <AppointmentNewTime time={time} setTime={setTime} />
            <AppointmentNewShare email={email} setEmail={setEmail} />
            <AppointmentNewButtons />
          </div>
        </div>
      </div>
    </>
  );
}
