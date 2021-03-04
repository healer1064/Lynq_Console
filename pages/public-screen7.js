// libraries
import Head from "next/head";
import { useState } from "react";

// styles
import styles from "../styles/PublicScreen.module.sass";

// components
import Navbar from "../components/Navbar";
import PublicScreenHead from "../components/PublicScreen/PublicScreenHead";
import PublicScreenModal from "../components/PublicScreen/PublicScreenModal";

const PublicScreen7 = () => {
  // states
  const [modal, setModal] = useState(false);
  return (
    <>
      <Head>
        <title>Public Screen 7</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      {modal && <PublicScreenModal setModal={setModal} />}
      <div className={styles.public_screen}>
        <div className={styles.public_screen_5}>
          <PublicScreenHead />
          <div className={styles.public_screen_body}>
            <div className={styles.order_summary_container}>
              <div className={styles.order_summary}>
                <h3>Order Summary </h3>
                <p>Meditation: 60 min</p>
                <p>Tuesday 30 March, 2021 </p>
                <p>10:00 AM</p>
                <div className={styles.border} />
                <div>
                  <p>Subtotal Price</p>
                  <h6>$60</h6>
                </div>
                <div>
                  <p>Service Fees (2.9%)</p>
                  <h6>$1.74</h6>
                </div>
                <div className={styles.border} />
                <div>
                  <h6 className={styles.total_price}>Total Price</h6>
                  <h6>$61.74</h6>
                </div>
              </div>
            </div>
            <div className={styles.cancellation}>
              <div className={styles.main}>
                <h3>Conditions of cancellation</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Bibendum fringilla adipiscing sed posuere sed null viverra
                  nulla elit.
                </p>
                <button onClick={() => setModal(true)}>
                  Cancel the appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicScreen7;
