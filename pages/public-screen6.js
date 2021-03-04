// libraries
import Head from "next/head";

// styles
import styles from "../styles/PublicScreen.module.sass";

// components
import Navbar from "../components/Navbar";
import PublicScreenHead from "../components/PublicScreen/PublicScreenHead";
import PublicScreenButton from "../components/PublicScreen/PublicScreenButton";
import PublicScreenMore from "../components/PublicScreen/PublicScreenMore";

const PublicScreen6 = () => {
  return (
    <>
      <Head>
        <title>Public Screen 6</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className={styles.public_screen}>
        <div className={styles.public_screen_5}>
          <PublicScreenHead />
          <div className={styles.public_screen_body}>
            <div className={styles.appointment}>
              <p>Hello, here is an invitation for our next appointment</p>
              <div className={styles.appointment_info}>
                <div>
                  <h6>Appointment</h6>
                  <p>Meditation: 60 min</p>
                  <p>Tuesday 30 March, 2021 </p>
                  <p>10:00 AM</p>
                  <h5>Price $60</h5>
                </div>
                <div>
                  <PublicScreenButton text="BOOK" />
                </div>
              </div>
              <div className={styles.other}>
                <div className={styles.box}>
                  <h6>What you need to bring</h6>
                  <p>Yoga mattress</p>
                  <p>Dumbbells</p>
                  <p>Whatelse?</p>
                  <div>
                    <PublicScreenMore />
                  </div>
                </div>
                <div className={styles.box}>
                  <h6>What will you learn?</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Bibendum fringilla adipiscing sed posuere sed null viverra
                    nulla elit.
                  </p>
                  <div>
                    <PublicScreenMore />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicScreen6;
