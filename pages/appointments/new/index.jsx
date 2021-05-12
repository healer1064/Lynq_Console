// libraries
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsInfoCircleFill } from "react-icons/bs";

// styles
import "react-datepicker/dist/react-datepicker.css";

// context
import ProfileContext from "../../../context/profile";

// components
// import AppointmentNewShare from "../../components/Appointments/AppointmentNewShare";
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
  const [listingPrice, setLisitngPrice] = useState(null);
  const [listingLoading, setLisitngLoading] = useState(false);

  // use context
  const { token } = useContext(ProfileContext);

  // router
  const router = useRouter();

  const findListingPrice = async (price) => {
    if (price != "") {
      setLisitngLoading(true);
      async function get() {
        const response = await fetch(
          `https://api.lynq.app/account/event-type/simulate?t=${token}&price=${price}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        setLisitngPrice(await response.json());

        return await response;
      }

      get()
        .then((res) => {
          setLisitngLoading(false);
          if (res.status != 200) {
            toast.error("An error has occurred");
          }
        })
        .catch(() => {
          toast.error("An error has occurred");
        });
    }
  };

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
      toast.error("Error, Failed To Fetch Event Types.");
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
        ).format("yyyy-MM-DD")}&end=${moment(day)
          .add(5, "days")
          .format("yyyy-MM-DD")}&activity_id=${eventId}`,
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
        toast.error("Error, Failed To Fetch Time Slots");
        setTimeLoading(false);
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
    if (moment(day).format("MM-DD-YYYY") === moment().format("MM-DD-YYYY")) {
      setPrevDisable(true);
    } else {
      setPrevDisable(false);
    }
  }, [day]);

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
        start_date: time,
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
          router.push(`/appointments/${res.id}`);
        })
        .catch((err) => {
          toast.error("Error, Failed To Book Appointments.");
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
                onChange={(e) => {
                  setPrice(e.target.value);
                  findListingPrice(e.target.value);
                }}
                style={{ paddingLeft: "25px" }}
              />
              <img
                className="abs-list-img"
                src="/img/dollar.svg"
                alt="dollar"
              />
              <div className="listing-price-info-wrap">
                <h3>
                  Listing Price{" "}
                  <BsInfoCircleFill className="listing-price-info-icon" />
                  <div className="listing-price-info">
                    <h6>
                      The price a customer pays to purchase the service and that
                      includes Lynq's fees.
                    </h6>
                    <p>Fees are based on your subscription plan on Lynq</p>
                  </div>
                </h3>
                {listingLoading ? (
                  <img
                    style={{ width: "18px", height: "18px", marginTop: "5px" }}
                    src="/img/Rolling-dark.svg"
                    alt="rolling"
                  />
                ) : (
                  <h3>
                    {listingPrice
                      ? `$${listingPrice.simulated_price}`
                      : "Please enter price above to get listing price"}
                  </h3>
                )}
              </div>
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
            <AppointmentNewButtons handleBook={handleBook} loading={loading} />
          </div>
        )}
      </div>
    </>
  );
}
