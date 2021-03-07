// libraries
import Head from "next/head";

// styles
import styles from "../styles/PublicScreen.module.sass";

// components
import Navbar from "../components/Navbar";
import PublicScreenHead from "../components/PublicScreen/PublicScreenHead";

const PublicScreen9 = () => {
  return (
    <>
      <Head>
        <title>Public Screen 9</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className={styles.public_screen}>
        <div className={styles.public_screen_5}>
          {/* <PublicScreenHead /> */}
          <div className={styles.public_screen_body}>
            <p className={styles.cancelled}>
              Your appointment has been cancelled
              <br />A confirmation email has been sent in your mail box
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicScreen9;
