// libraries
import Head from "next/head";
import { useState } from "react";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import AppointmentNewShare from "../../components/Appointments/AppointmentNewShare";
import AppointmentNewButtons from "../../components/Appointments/AppointmentNewButtons";
import AppointmentNewTime from "../../components/Appointments/AppointmentNewTime";
import Calendar from "../../components/Appointments/Calendar";

// mockup data
import data from "../../utils/data";

export default function AppointmentNew() {
  // states
  const [eventType, setEventType] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState();
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectDay = (_start, _end) => {
    console.log(_start, _end);
    // setIsOpen(false);
  };

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
                onChange={(e) => {
                  const { value } = e.target;

                  console.log(value);
                  if (value !== -1) {
                    let event = data.setting.eventType.find(
                      (item) => item.id == value
                    );
                    setEventType(event.event_type);
                    setDuration(event.duration);
                    setPrice(event.price);
                  }
                }}
              >
                <option value={-1}>Select Event Type</option>
                {data.setting.eventType.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.event_type}
                  </option>
                ))}
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
            <label className="small" style={{ position: "relative" }}>
              <strong>Price</strong>
              <input
                type="number"
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ paddingLeft: "25px" }}
              />
              <img className="abs-img" src="/img/dollar.svg" alt="dollar" />
            </label>
            <label style={{ position: "relative" }} className="small">
              <strong>Day</strong>
              <input
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsOpen(true);
                }}
                readOnly
              ></input>
              {isOpen && (
                <Calendar
                  currDate={{ weekStart: new Date(), weekEnd: new Date() }}
                  setOpen={setIsOpen}
                  handleChange={selectDay}
                />
              )}
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
