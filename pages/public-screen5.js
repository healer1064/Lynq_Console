// libraries
import Head from "next/head";

// components
import Navbar from "../components/Navbar";
import PublicScreenAbout from "../components/PublicScreen/PublicScreenAbout";

const PublicScreen5 = () => {
  return (
    <>
      <Head>
        <title>Public Screen 5</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className="public-screen">
        <div className="public-screen-gradient" />
        <PublicScreenAbout />
        <div className="public-screen-1-hr" />
        <div className="public-screen-1-body">
          <h3>Book a session</h3>
          <div className="public-screen-5">
            <div className="public-screen-5-order-summary">
              <h6 className="public-screen-5-order-summary-heading">
                Order Summary
              </h6>
              <div className="public-screen-5-order-summary-content">
                <div className="public-screen-5-order-summary-img" />
                <div className="public-screen-5-order-summary-content-sub">
                  <div className="public-screen-5-order-summary-content-title">
                    <h5>Full Moon Meditation (1)</h5>
                    <h6>$50</h6>
                  </div>
                  <div>
                    <img src="/img/public-screen-5-user.png" alt="user" />
                    <p>With John</p>
                  </div>
                  <div>
                    <img
                      src="/img/public-screen-5-calendar.png"
                      alt="calendar"
                    />
                    <p>February 22, 2021 10:00 AM ET</p>
                  </div>
                  <div>
                    <img src="/img/public-screen-5-clock.png" alt="clock" />
                    <p>Duration : 60 Minutes Session</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-screen-5-share">
              <h6>
                Please share anything that will help prepare for our meeting.
              </h6>
              <textarea></textarea>
            </div>
          </div>
          <button>Confirm</button>
        </div>
      </div>
    </>
  );
};

export default PublicScreen5;
