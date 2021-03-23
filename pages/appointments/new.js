// libraries
import Head from "next/head";
import { useState, useContext, useEffect } from "react";

// context
import ProfileContext from "../../context/profile";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import AppointmentNewShare from "../../components/Appointments/AppointmentNewShare";
import AppointmentNewButtons from "../../components/Appointments/AppointmentNewButtons";
import AppointmentNewTime from "../../components/Appointments/AppointmentNewTime";
import Calendar from "../../components/Appointments/Calendar";
import PageLoading from "../../components/common/PageLoading";

// mockup data
// import data from "../../utils/data";

export default function AppointmentNew() {
  // states
  const [eventType, setEventType] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState();
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  // use context
  const { token } = useContext(ProfileContext);

  const selectDay = (_start, _end) => {
    console.log(_start, _end);
    // setIsOpen(false);
  };

  const getEventTypes = async () => {
    // const response = await fetch("/api/settings/get-event-types", {
    //   headers: new Headers({ "Content-Type": "application/json", token }),
    // });

    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    const response = await fetch(
      `https://reb00t.uc.r.appspot.com/account/event-type?t=${token}`,
      config
    );

    const data = await response.json();

    setData(data);
  };

  useEffect(() => {
    getEventTypes();
  }, [token]);

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
          {!data ? (
            <PageLoading />
          ) : (
            <div className="appointment-new">
              <h2>Appointment</h2>
              <label>
                <strong>Event Type</strong>
                <select
                  onChange={(e) => {
                    const { value } = e.target;
                    if (value !== -1) {
                      let event = data.find((item) => item.id == value);
                      setDuration(event.duration);
                      setPrice(event.price);
                      setEventType(event.name);
                    }
                  }}
                  value={eventType}
                >
                  <option value={-1}>Select Event Type</option>
                  {data.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
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
          )}
        </div>
      </div>
    </>
  );
}
