// libraries
import Head from "next/head";
import { useRouter } from "next/router";

// styles
import styles from "../../styles/PublicScreen.module.sass";

// components
import Navbar from "../../components/PublicScreen/PublicScreenNavbar";
import PublicScreenButton from "../../components/PublicScreen/PublicScreenButton";

const OrderConfirm = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Appointment Confirmed</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className={styles.public_screen}>
        <div className={styles.public_screen_5}>
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
                  <h6>$1.74</h6>
                </div>
              </div>
            </div>
            <div className={styles.congrats}>
              <div className={styles.main}>
                <h3>Congrats!</h3>
                <p>
                  Your appointment is confirmed.
                  <br />
                  You will find all the detail in the email we have just set.
                  <br />
                  <br />
                  Have a great session.
                </p>
                <PublicScreenButton
                  text="Back to homepage"
                  onClick={() => {
                    router.push("/");
                  }}
                />
              </div>
              <p>
                If you need to share some information ahead of the appointment,
                please let me know
              </p>
              <div className={styles.form}>
                <textarea></textarea>
                <div>
                  <PublicScreenButton text="SEND" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirm;
