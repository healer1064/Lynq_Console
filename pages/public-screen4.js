// libraries
import Head from "next/head";

// components
import Navbar from "../components/Navbar";
import PublicScreenAbout from "../components/PublicScreen/PublicScreenAbout";
import PublicScreenDropdown from "../components/PublicScreen1/PublicScreenDropwdown";

const PublicScreen4 = () => {
  return (
    <>
      <Head>
        <title>Public Screen 4</title>
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
          <PublicScreenDropdown />
          <div className="public-screen-2-meditation">
            <div className="public-screen-2-meditation-info">
              <h3>Meditation 30 Min</h3>
              <p>Length: 1 hr</p>
              <p>Price: $50</p>
              <div>
                <span>Specific day</span>
                <input type="date" />
              </div>
            </div>
            <div className="public-screen-2-meditation-time">
              <div className="public-screen-2-meditation-times">
                <img src="/img/public-screen-left.png" alt="left" />
                <div className="public-screen-2-meditation-single-time">
                  <div>
                    <h6>Thursday</h6>
                    <p>Feb 11</p>
                  </div>
                  <div>
                    <h6>Friday</h6>
                    <p>Feb 12</p>
                  </div>
                  <div>
                    <h6>Saturday</h6>
                    <p>Feb 13</p>
                  </div>
                  <div>
                    <h6>Sunday</h6>
                    <p>Feb 14</p>
                  </div>
                </div>
                <img src="/img/public-screen-right.png" alt="right" />
              </div>
              <div className="public-screen-3-meditation-avail-time">
                <div>
                  <div>09:00 AM</div>
                  <div className="active">10:00 AM</div>
                  <div>11:00 AM</div>
                  <div>12:00 AM</div>
                </div>
                <div>
                  <div>09:00 AM</div>
                  <div>10:00 AM</div>
                  <div>11:00 AM</div>
                  <div>12:00 AM</div>
                </div>
                <div>
                  <div>09:00 AM</div>
                  <div>10:00 AM</div>
                  <div>11:00 AM</div>
                  <div>12:00 AM</div>
                </div>
                <div>
                  <div>09:00 AM</div>
                  <div>10:00 AM</div>
                  <div>11:00 AM</div>
                  <div>12:00 AM</div>
                </div>
              </div>
            </div>
          </div>
          <div className="public-screen-2-sessions">
            <div className="public-screen-2-sessions-info">
              <h6>About this sessions</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Bibendum fringilla adipiscing sed posuere sed null viverra nulla
                elit. Volutpat sagittis orci arcu parturient purus aliquam
                dictumst elit. Tempus, libero ipsum viverra mauris fusce ac
                volutpat, iaculis sit. adipi
              </p>
            </div>
            <div className="public-screen-2-sessions-need">
              <h6>What you need</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Bibendum fringilla adipiscing sed posuere sed null viverra nulla
                elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicScreen4;
