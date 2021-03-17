// libraries
import Head from "next/head";
import { useState } from "react";
import Fade from "react-reveal/Fade";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import EmailConfirmation from "../../components/Home/EmailConfirmation";
import AppointmentCard from "../../components/Home/AppointmentCard";
import Stats from "../../components/Home/Stats";
// import Modal from "../../components/common/Modal";

// mockup data
import data from "../../utils/data";
import { appointments } from "../../utils/data/homefake";

const home = () => {
  const [index, setIndex] = useState(1);
  const [stats, setStats] = useState(data.home.stats.today);
  const [isOpen, setIsOpen] = useState(false);

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
              {appointments.map((item, index) => (
                <AppointmentCard
                  key={index}
                  data={item}
                  setIsOpen={setIsOpen}
                />
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
                {/* <select name="" id="" className="home-stats__select">
                <option value="">Today</option>
                <option value="">Weekly</option>
                <option value="" selected>
                  Monthly
                </option>
                <option value="">Yearly</option>
              </select> */}
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
