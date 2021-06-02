// libraries
import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import Fade from "react-reveal/Fade";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../context/profile";

// components
// import EmailConfirmation from "../components/Home/EmailConfirmation";
import PageLoading from "../components/common/PageLoading";
import HomeAppointmentsList from "../components/Home/HomeAppointmentsList";
import Onboarding from "../components/Home/Onboarding";

// mockup
import mockUpData from "../utils/data";
import { dateIsBetween, formatTime } from "../utils/DateHelper";

const home = () => {
  // context
  const { token, slugData } = useContext(ProfileContext);

  // states
  const [appointmentList, setAppointmentList] = useState(null);
  const [currSession, setCurrSession] = useState({
    time: null,
    id: null,
  });
  const [nextSession, setNextSession] = useState({
    time: null,
    id: null,
  });

  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token]);

  const fetchAppointments = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        `https://api.lynq.app/account/appointments?t=${token}`,
        config
      );

      const _data = await response.json();

      var groupArrays = [];

      if (_data.length > 0) {
        const groups = _data.reduce((groups, appointment) => {
          // const date = appointment.starting_date.split("T")[0];
          const date = moment(appointment.starting_date).format("YYYY-MM-DD");
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(appointment);
          return groups;
        }, {});

        groupArrays = Object.keys(groups).map((date) => {
          return {
            date,
            appointments: groups[date],
          };
        });
      }

      const filteredArray = groupArrays.filter((i) => {
        var currentDate = moment().format("YYYY-MM-DD");
        var date = moment(i.date).format("YYYY-MM-DD");
        return date == currentDate;
      });

      setAppointmentList(filteredArray);

      if (filteredArray.length > 0) {
        getCurrentSession(filteredArray[0].appointments);
      }
      getNextSession(_data);
    } catch (err) {
      setAppointmentList([]);
      toast.error(err.message);
    }
  };

  const getCurrentSession = (_data) => {
    let format = "hh:mm A";

    _data.forEach((appt) => {
      if (dateIsBetween(appt.starting_date, appt.ending_date)) {
        setCurrSession({
          time: `${formatTime(appt.starting_date, format)} - ${formatTime(
            appt.ending_date,
            format
          )}`,
          id: appt.id,
          name: appt.activity_name,
        });
      }
    });
  };

  const getNextSession = (_data) => {
    let format = "hh:mm A";

    let time = moment();

    _data.sort(compare);

    for (let i = 0; i < _data.length; i++) {
      let start = moment(_data[i].starting_date);
      let end = moment(_data[i].ending_date);

      if (time.isBefore(start, end)) {
        setNextSession({
          time: time.isSame(start, "day")
            ? `${start.format(format)} - ${end.format(format)}`
            : `${start.format(format)} - ${end.format(format)} ${start.format(
                "MMM DD YYYY"
              )}`,
          id: _data[i].id,
          name: _data[i].activity_name,
        });

        break;
      }
    }
  };

  const compare = (a, b) => {
    if (
      a.ending_date < b.ending_date ||
      (a.ending_date == b.ending_date && a.starting_date > b.starting_date)
    )
      return -1;
    if (
      a.ending_date > b.ending_date ||
      (a.ending_date == b.ending_date && a.starting_date < b.starting_date)
    )
      return 1;
    return 0;
  };

  const fullDate = () => {
    const date = moment().toDate();
    return `${moment(date).format("dddd")}, ${moment(date).format("MMMM")}
     ${moment(date).format("DD")}, ${moment(date).format("YYYY")}`;
  };

  return (
    <>
      <Head>
        <title>Home - Lynq</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="home-wrp">
        {appointmentList === null ? (
          <PageLoading />
        ) : (
          <>
            <div className="notifications__col">
              {/* <EmailConfirmation /> */}
              {currSession.time !== null && slugData !== null && (
                <div className="session">
                  <span>
                    Current live session
                    {currSession.name == null &&
                      // ? "Current live session"
                      " | From google calender"}
                    | {currSession.time}
                  </span>
                  {currSession.name !== null && (
                    <a
                      href={`https://us.lynq.app/${slugData.slug}/teacher/${currSession.id}`}
                      className="access__live"
                      target="_blank"
                    >
                      ACCESS THE LIVE
                    </a>
                  )}
                </div>
              )}
              {nextSession.time !== null && slugData !== null && (
                <div className="session">
                  <span>
                    Next Session
                    {nextSession.name == null &&
                      // ? "Click here to start your next session"
                      " | From google calender"}
                    | {nextSession.time}
                  </span>
                  {nextSession.name !== null && (
                    <a
                      href={`https://us.lynq.app/${slugData?.slug}/teacher/${nextSession.id}`}
                      className="start__live"
                      target="blank"
                    >
                      START THE LIVE
                    </a>
                  )}
                </div>
              )}
            </div>
            <Fade duration={1000}>
              <div className="home-cnt">
                <div className="home-cnt__date">
                  <div className="date-slug-inner">
                    {fullDate()}
                    <h2>Today’s Session</h2>
                  </div>
                  <span>
                    <h4>Your Lynq url</h4>
                    <h5>
                      {slugData && slugData.slug
                        ? `us.lynq.app/${slugData.slug}`
                        : "You need to customize it in Public Profile"}
                    </h5>
                  </span>
                </div>
                <HomeAppointmentsList appointmentList={appointmentList} />
              </div>
            </Fade>
          </>
        )}
      </div>
      {!localStorage.getItem("lynqOnboarding") && <Onboarding />}
    </>
  );
};

export default home;
