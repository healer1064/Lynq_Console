// libraries
import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import Fade from "react-reveal/Fade";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../context/profile";

// components
import Navbar from "../components/Navbar";
import Leftbar from "../components/Leftbar";
import EmailConfirmation from "../components/Home/EmailConfirmation";
import PageLoading from "../components/common/PageLoading";
import Modal from "../components/common/Modal";
import HomeStats from "../components/Home/HomeStats";
import HomeAppointmentsList from "../components/Home/HomeAppointmentsList";

const home = () => {
  // context
  const { token, slugData } = useContext(ProfileContext);

  // states
  const [appointmentList, setAppointmentList] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [id, setId] = useState(-1);
  const [stats, setStats] = useState("TODAY");
  const [currSession, setCurrSession] = useState({
    time: null,
    link: null,
    id: null,
  });
  const [nextSession, setNextSession] = useState({
    time: null,
    link: null,
    id: null,
  });

  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token, success]);

  useEffect(() => {
    if (token) {
      fetchStats();
    }
  }, [token, stats]);

  useEffect(() => {
    if (slugData?.slug !== undefined && currSession.time !== null) {
      setCurrSession({
        ...currSession,
        link: `us.lynq.app/${slugData.slug}/${currSession.id}`,
      });
    }
    console.log("use effect", slugData);
    if (slugData?.slug !== undefined && nextSession.id !== null) {
      setNextSession({
        ...nextSession,
        link: `us.lynq.app/${slugData.slug}/${nextSession.id}`,
      });
    }
  }, [slugData]);

  const fetchStats = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        `https://api.lynq.app/account/stats?t=${token}&period=${stats}`,
        config
      );

      const _data = await response.json();

      setStatsData(_data);
    } catch (err) {
      toast.error("Error Occured, Stats Cannot Be Shown");
    }
  };

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
          const date = appointment.starting_date.split("T")[0];
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

    // let time = moment(`2021-04-14T16:00:00.262608`);
    let time = moment();

    _data.forEach((appt) => {
      let start = moment(appt.starting_date);
      let end = moment(appt.ending_date);
      if (time.isBetween(start, end)) {
        setCurrSession({
          ...currSession,
          time: `${start.format(format)} - ${end.format(format)}`,
          id: appt.id,
        });
      }
    });
  };

  const getNextSession = (_data) => {
    let format = "hh:mm A";

    // let time = moment(`2021-04-14T16:00:00.262608`);
    let time = moment();

    _data.sort(compare);

    for (let i = 0; i < _data.length; i++) {
      let start = moment(_data[i].starting_date);
      let end = moment(_data[i].ending_date);

      if (time.isBefore(start, end)) {
        setNextSession({
          ...nextSession,
          time: time.isSame(start, "day")
            ? `${start.format(format)} - ${end.format(format)}`
            : `${start.format(format)} - ${end.format(format)} ${start.format(
                "MMM DD YYYY"
              )}`,
          id: _data[i].id,
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

  const toggle = (_id) => {
    setIsOpen(true);
    setId(_id);
  };

  const onDelete = () => {
    setRejectLoading(true);
    async function reject() {
      const response = await fetch(
        `https://api.lynq.app/account/appointments/${id}/cancel?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return await response;
    }

    reject()
      .then((res) => {
        setRejectLoading(false);
        if (res.status === 200) {
          setIsOpen(false);
          setSuccess(!success);
        } else {
          toast.error("Something went wrong!!, appointment cancel failed");
        }
      })
      .catch((err) => {
        setRejectLoading(false);
        toast.error("An error has occurred");
      });
  };

  const fullDate = () => {
    const date = moment().toDate();
    return `${moment(date).format("dddd")}, ${moment(date).format("MMMM")}
     ${moment(date).format("DD")}, ${moment(date).format("YYYY")}`;
  };

  console.log(nextSession.link);

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
      <Navbar active="" />
      <ToastContainer />
      <div className="page-wrp">
        <Leftbar active="" />
        <div className="home-wrp">
          {!appointmentList ? (
            <PageLoading />
          ) : (
            <>
              {isOpen && (
                <Modal
                  setModal={setIsOpen}
                  onDelete={onDelete}
                  loading={rejectLoading}
                />
              )}
              <div className="notifications__col">
                {/* <EmailConfirmation /> */}
                {currSession.time !== null && (
                  <div className="session">
                    <span>Current live session | {currSession.time}</span>
                    <a
                      href={`https://${currSession.link}`}
                      className="access__live"
                      target="_blank"
                    >
                      ACCESS THE LIVE
                    </a>
                  </div>
                )}
                {nextSession.time !== null && (
                  <div className="session">
                    <span>
                      Click here to start your next session | {nextSession.time}
                    </span>
                    <a
                      href={`https://${nextSession.link}`}
                      className="start__live"
                      target="blank"
                    >
                      START THE LIVE
                    </a>
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
                  <HomeAppointmentsList
                    appointmentList={appointmentList}
                    toggle={toggle}
                  />
                  <HomeStats data={statsData} setStats={setStats} />
                </div>
              </Fade>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default home;
