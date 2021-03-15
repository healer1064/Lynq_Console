// libraries
import Head from "next/head";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import { useState } from "react";
import Stats from "../../components/Home/Stats";

// mockup data
import data from "../../utils/data";

const home = () => {
  const [index, setIndex] = useState(1);
  const [stats, setStats] = useState(data.home.stats.today);

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
      <Navbar />
      <div className="page-wrp">
        <Leftbar active="" />
        <div className="home-wrp">
          <div className="notifications__col">
            <div className="confirm__email">
              <span>
                Please confirm your email address. A confirmation email was sent
                to IlhamdanShalima@gmail.com
              </span>
              <a href="#">Resend Confirmation</a>
            </div>
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
          <div className="home-cnt">
            <div className="home-cnt__date">Wednesday, February 10, 2021</div>
            <h2>Today’s Session</h2>
            <div className="appointments-col__event blue">
              <div className="title">Meditation 30 Min</div>
              <div className="det">
                Wednesday, 24, 2021
                <div className="line"></div>
                <b>10:00 AM - 11:00 AM</b>
                <div className="line"></div>
                <b>60 Min</b>
              </div>
              <div className="client">
                Client: John Regiani
                <div className="line"></div>
                John.regiani@gmail.com
              </div>
            </div>
            <div className="appointments-col__event red">
              <div className="title">Event in your google calendar</div>
              <div className="det">
                Wednesday, 24, 2021
                <div className="line"></div>
                <b>10:00 AM - 11:00 AM</b>
                <div className="line"></div>
                <b>60 Min</b>
              </div>
            </div>
            <div className="appointments-col__event blue">
              <div className="title">Meditation 30 Min</div>
              <div className="det">
                Wednesday, 24, 2021
                <div className="line"></div>
                <b>10:00 AM - 11:00 AM</b>
                <div className="line"></div>
                <b>60 Min</b>
              </div>
              <div className="client">
                Client: John Regiani
                <div className="line"></div>
                John.regiani@gmail.com
              </div>
            </div>
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
        </div>
      </div>
    </>
  );
};

export default home;
