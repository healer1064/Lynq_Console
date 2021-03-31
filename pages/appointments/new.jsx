// libraries
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// styles
import "react-datepicker/dist/react-datepicker.css";

// context
import ProfileContext from "../../context/profile";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import AppointmentNewShare from "../../components/Appointments/AppointmentNewShare";
import AppointmentNewButtons from "../../components/Appointments/AppointmentNewButtons";
import AppointmentNewTime from "../../components/Appointments/AppointmentNewTime";
import PageLoading from "../../components/common/PageLoading";

export default function AppointmentNew() {
  // states
  const [eventType, setEventType] = useState("");
  const [eventId, setEventId] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [day, setDay] = useState();
  const [pickerDay, setPicker] = useState();
  const [time, setTime] = useState();
  const [times, setTimes] = useState([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLoading, setTimeLoading] = useState(false);

  // use context
  const { token } = useContext(ProfileContext);

  // router
  const router = useRouter();

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

  const fetchTimes = () => {
    setTimeLoading(true);
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    const times = async () => {
      const response = await fetch(
        `https://api.lynq.app/account/public-profile/availability?t=${token}&start=${moment(
          day
        ).format("YYYY-MM-DD")}&end=${moment(day)
          .add(4, "days")
          .format("YYYY-MM-DD")}&activity_id=${eventId}`,
        config
      );

      return await response.json();
    };

    times()
      .then((res) => {
        setTimeLoading(false);
        let sorted = sortDates(res);
        console.log(sorted);
        setTimes(sorted);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const sortDates = (_data) => {
    let newArr = [];

    // conver to arary
    Object.entries(_data).map((item) => {
      newArr.push({ date: item[0], slots: item[1] });
    });

    // sort
    newArr.sort((a, b) => new Date(a.date) - new Date(b.date));

    return newArr;
  };

  useEffect(() => {
    if (token) {
      getEventTypes();
    }
  }, [token]);

  useEffect(() => {
    if (day && eventId !== "" && token) {
      fetchTimes();
    }
  }, [day, eventId]);

  const handleBook = () => {
    if (
      eventType !== "" &&
      duration !== "" &&
      price !== "" &&
      day &&
      time &&
      email !== "" &&
      firstName !== "" &&
      lastName !== ""
    ) {
      setError(false);
      setLoading(true);
      const _reqData = {
        activity_id: eventId,
        start_date: time.split(".")[0],
        duration,
        price,
        first_name: firstName,
        last_name: lastName,
        email,
        stripe_pk: "",
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

      book()
        .then((res) => {
          setLoading(false);
          console.log("booking complete", res);
          router.push(`/appointments/${res.id}`);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    } else {
      setError(true);
    }
  };

  const handleNextArrow = () => {
    setDay(moment(day).add(2, "days").toString());
  };
  const handlePrevArrow = () => {
    setDay(moment(day).subtract(2, "days").toString());
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
              <ToastContainer />
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
                      console.log(event.name);
                    }
                  }}
                >
                  <option value={-1}>Select Event Type</option>
                  {data
                    .filter((i) => i.isActive == true)
                    .map((item) => (
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
              <label style={{ position: "relative" }} className="quarter">
                <strong>Day</strong>
                <DatePicker
                  selected={pickerDay}
                  onChange={(date) => {
                    setPicker(date);
                    setDay(moment(date));
                  }}
                />
              </label>
              <label className="three-quarter">
                {day && eventId !== "" && (
                  <AppointmentNewTime
                    times={times}
                    setTime={setTime}
                    loading={timeLoading}
                    handleNextArrow={handleNextArrow}
                    handlePrevArrow={handlePrevArrow}
                  />
                )}
              </label>
              {/* <AppointmentNewShare email={email} setEmail={setEmail} /> */}
              {error && (
                <div>
                  <p
                    style={{
                      color: "red",
                      paddingBottom: "20px",
                      width: "100%",
                    }}
                  >
                    Please fill all fields
                  </p>
                </div>
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
