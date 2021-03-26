// libraries
import Head from "next/head";
import { useRouter } from "next/router";
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

export default function AppointmentNew() {
  // states
  const [eventType, setEventType] = useState("");
  const [eventId, setEventId] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [day, setDay] = useState("03/21/2021");
  const [time, setTime] = useState("21:03");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // use context
  const { token } = useContext(ProfileContext);

  // router
  const router = useRouter();

  const selectDay = (_start, _end) => {
    console.log(_start, _end);
    // setIsOpen(false);
  };

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

    setData(data);
  };

  useEffect(() => {
    if (
      localStorage.getItem("linqToken") === null &&
      localStorage == undefined
    ) {
      router.push("/login");
    }
    if (token) {
      getEventTypes();
    }
  }, [token]);

  const handleBook = () => {
    if (
      eventType !== "" &&
      duration !== "" &&
      price !== "" &&
      day !== "" &&
      time !== "" &&
      email !== "" &&
      firstName !== "" &&
      lastName !== ""
    ) {
      setError(false);
      setLoading(true);
      const _reqData = {
        activity_id: eventId,
        start_date: "2021-03-26T15:01:53",
        duration,
        price,
        first_name: firstName,
        last_name: lastName,
        email,
        stripe_pk: "string",
      };

      async function book() {
        const response = await fetch(
          `https://api.lynq.app/account/appointments/request_booking?t=${token}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(_reqData),
          }
        );

        return await response.json();
      }

      book().then((res) => {
        setLoading(false);
        console.log("booking complete", res);
        router.push(`/appointments/${res.id}`);
      });
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Head>
        <title>Book an Appointment</title>
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
                      setEventId(event.id);
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
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ paddingLeft: "25px" }}
                />
                <img className="abs-img" src="/img/dollar.svg" alt="dollar" />
              </label>
              <label className="small">
                <strong>Client's Email</strong>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="small">
                <strong>Client's First Name</strong>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="small">
                <strong>Client's Last Name</strong>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label style={{ position: "relative" }} className="small">
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
                      currDate={{
                        weekStart: new Date(),
                        weekEnd: new Date(),
                      }}
                      setOpen={setIsOpen}
                      handleChange={selectDay}
                    />
                  )}
                </label>
              </label>
              <label className="small">
                <strong>Time</strong>
                <AppointmentNewTime time={time} setTime={setTime} />
              </label>
              {/* <AppointmentNewShare email={email} setEmail={setEmail} /> */}
              {error && (
                <p
                  style={{
                    color: "red",
                    paddingBottom: "20px",
                    width: "100%",
                  }}
                >
                  Please fill all fields
                </p>
              )}
              <AppointmentNewButtons
                handleBook={handleBook}
                loading={loading}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
