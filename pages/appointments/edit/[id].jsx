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
import ProfileContext from "../../../context/profile";

// components
import Navbar from "../../../components/Navbar";
import Leftbar from "../../../components/Leftbar";
import AppointmentNewButtons from "../../../components/Appointments/AppointmentNewButtons";
import AppointmentNewTime from "../../../components/Appointments/AppointmentNewTime";
import PageLoading from "../../../components/common/PageLoading";

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
  const [prevDisable, setPrevDisable] = useState(false);

  // use context
  const { token } = useContext(ProfileContext);

  // router
  const router = useRouter();

  const { id } = router.query;

  const fetchAppointment = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    try {
      const response = await fetch(
        `https://api.lynq.app/account/appointments/${id}?t=${token}`,
        config
      );

      const status = await response.status;

      const data = await response.json();

      // console.log(new Date(data.starting_date));

      if (status == 200) {
        setEventType(data.activity_name);
        setEventId(data.activity_id);
        setDuration(data.session_duration);
        setPrice(data.display_price);
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPicker(new Date(data.starting_date));
        setDay(moment(new Date(data.starting_date)));
        setTime(moment(data.starting_date).format("hh:mm a"));
      } else {
        toast.error("Error, Failed To Fetch Appointment");
      }
    } catch (err) {
      toast.error("Error, Failed To Fetch Appointment");
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [id, token]);

  const getEventTypes = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    try {
      const response = await fetch(
        `https://api.lynq.app/account/event-type?t=${token}`,
        config
      );

      const data = await response.json();

      setData(data);
    } catch (err) {
      toast.error("Error, Failed To Fetch Event Types");
    }
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
          .add(5, "days")
          .format("YYYY-MM-DD")}&activity_id=${eventId}`,
        config
      );

      return await response.json();
    };

    times()
      .then((res) => {
        setTimeLoading(false);
        let sorted = sortDates(res);
        setTimes(sorted);
      })
      .catch((err) => {
        setTimeLoading(false);
        toast.error("Error, Failed To Fetch Time Slots");
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

  useEffect(() => {
    if (moment(day).format("MM-DD-YYYY") === moment().format("MM-DD-YYYY")) {
      setPrevDisable(true);
    } else {
      setPrevDisable(false);
    }
  }, [day]);

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
          `https://api.lynq.app/account/appointments/${id}?t=${token}`,
          {
            method: "PUT",
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
          router.push(`/appointments/${res.id}`);
        })
        .catch((err) => {
          toast.error("Error, Failed to Book Appointment");
          setLoading(false);
        });
    } else {
      setError(true);
    }
  };

  const handleNextArrow = () => {
    setDay(moment(day).add(2, "days").toString());
  };
  const handlePrevArrow = () => {
    if (moment(day) < moment().toDate()) {
      setDay(moment().toDate());
    } else {
      if (moment(day).subtract(2, "days") < moment().toDate()) {
        setDay(moment().toDate());
      } else {
        setDay(moment(day).subtract(2, "days").toString());
      }
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
              <ToastContainer />
              <label>
                <strong>Event Type</strong>
                <input readOnly value={eventType} />
              </label>
              <label>
                <strong>Duration (in minutes)</strong>
                <input value={duration} readOnly />
              </label>
              <label className="small" style={{ position: "relative" }}>
                <strong>Price</strong>
                <input value={price} readOnly style={{ paddingLeft: "25px" }} />
                <img className="abs-img" src="/img/dollar.svg" alt="dollar" />
              </label>
              <label className="small">
                <strong>Client's Email</strong>
                <input readOnly value={email} />
              </label>
              <label className="small">
                <strong>Client's First Name</strong>
                <input readOnly value={firstName} />
              </label>
              <label className="small">
                <strong>Client's Last Name</strong>
                <input readOnly value={lastName} />
              </label>
              <label style={{ position: "relative" }} className="quarter">
                <strong>Day</strong>
                <DatePicker
                  minDate={moment().toDate()}
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
                    prevDisable={prevDisable}
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
