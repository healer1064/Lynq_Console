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

  const fetchStats = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `https://api.lynq.app/account/stats?t=${token}&period=${stats}`,
      config
    );

    const _data = await response.json();

    setStatsData(_data);
  };

  const fetchAppointments = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

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
        console.log("res reject", res);
        if (res.status === 200) {
          setIsOpen(false);
          setSuccess(!success);
        } else {
          toast.error("An error has occurred");
          console.log("res reject error", res);
        }
      })
      .catch((err) => {
        setRejectLoading(false);
        toast.error("An error has occurred");
        console.log(err);
      });
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
              <div className="notifications__col" style={{ display: "none" }}>
                <EmailConfirmation />
                <div className="session">
                  <span>Current live session | 08:00 AM - 09:00 AM</span>
                  <a href="#" className="access__live">
                    ACCESS THE LIVE
                  </a>
                </div>
                <div className="session">
                  <span>
                    Click here to start your next session | 09:00 AM - 10:00 AM
                  </span>
                  <a href="#" className="start__live">
                    START THE LIVE
                  </a>
                </div>
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
