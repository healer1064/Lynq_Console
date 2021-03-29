// libraries
import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Fade from "react-reveal/Fade";
import moment from "moment";

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

// mockup data
import data from "../utils/data";

const home = () => {
  // context
  const { token, slugData } = useContext(ProfileContext);

  // router
  const router = useRouter();

  // states
  const [appointmentList, setAppointmentList] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(-1);

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
    setIsOpen(false);
    // let filter = appointmentList.filter((item) => item.id !== id);
    // setAppointmentList(filter);
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
      <div className="page-wrp">
        <Leftbar active="" />
        <div className="home-wrp">
          {!appointmentList ? (
            <PageLoading />
          ) : (
            <>
              {isOpen && <Modal setModal={setIsOpen} onDelete={onDelete} />}
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
                          ? `www.lynq.app/${slugData.slug}`
                          : "You need to customize it in Public Profile"}
                      </h5>
                    </span>
                  </div>
                  <HomeAppointmentsList
                    appointmentList={appointmentList}
                    toggle={toggle}
                  />
                  <HomeStats data={data} />
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
