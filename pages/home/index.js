// libraries
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Fade from "react-reveal/Fade";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import EmailConfirmation from "../../components/Home/EmailConfirmation";
import AppointmentCard from "../../components/Home/AppointmentCard";
import Stats from "../../components/Home/Stats";
import PageLoading from "../../components/common/PageLoading";
import Modal from "../../components/common/Modal";

// mockup data
import data from "../../utils/data";
import { appointments } from "../../utils/data/homefake";

const home = () => {
  const router = useRouter();
  const [preLoading, setPreLoading] = useState(true);
  const [appointmentList, setAppointmentList] = useState(appointments);
  const [index, setIndex] = useState(1);
  const [stats, setStats] = useState(data.home.stats.today);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(-1);

  useEffect(() => {
    if (localStorage.getItem("linqToken") === null) {
      router.push("/login");
    } else {
      setPreLoading(false);
    }
  }, []);

  const toggle = (_id) => {
    setIsOpen(true);
    setId(_id);
  };

  const onDelete = () => {
    setIsOpen(false);
    let filter = appointmentList.filter((item) => item.id !== id);
    setAppointmentList(filter);
  };

  if (preLoading)
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          left: "0",
          top: "0",
          right: "0",
          bottom: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PageLoading />
      </div>
    );

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
              <div className="home-cnt__date">Wednesday, February 10, 2021</div>
              <h2>Today’s Session</h2>
              {appointmentList.map((item, index) => (
                <AppointmentCard key={index} data={item} toggle={toggle} />
              ))}
              <div className="home-stats" style={{ paddingBottom: "50px" }}>
                <div className="home-stats__switch">
                  <div
                    className={`option  ${index === 1 && "active"}`}
                    onClick={() => {
                      setIndex(1);
                      setStats(data.home.stats.today);
                    }}
                  >
                    Today
                  </div>
                  <div
                    className={`option  ${index === 2 && "active"}`}
                    onClick={() => {
                      setIndex(2);
                      setStats(data.home.stats.weekly);
                    }}
                  >
                    Weekly
                  </div>
                  <div
                    className={`option  ${index === 3 && "active"}`}
                    onClick={() => {
                      setIndex(3);
                      setStats(data.home.stats.monthly);
                    }}
                  >
                    Monthly
                  </div>
                  <div
                    className={`option  ${index === 4 && "active"}`}
                    onClick={() => {
                      setIndex(4);
                      setStats(data.home.stats.yearly);
                    }}
                  >
                    Yearly
                  </div>
                </div>
                <select
                  value={index}
                  onChange={(e) => {
                    setIndex(e.target.value);
                    e.target.value == 1
                      ? setStats(data.home.stats.today)
                      : e.target.value == 2
                      ? setStats(data.home.stats.weekly)
                      : e.target.value == 3
                      ? setStats(data.home.stats.monthly)
                      : setStats(data.home.stats.yearly);
                  }}
                  className="home-stats__select"
                >
                  <option value={1}>Today</option>
                  <option value={2}>Weekly</option>
                  <option value={3}>Monthly</option>
                  <option value={4}>Yearly</option>
                </select>
                <Stats stats={stats} />
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default home;