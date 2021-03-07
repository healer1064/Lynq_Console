// libraries
import Head from "next/head";

// styles
import styles from "../styles/PublicScreen.module.sass";

// components
import Navbar from "../components/Navbar";
import PublicScreenLeftbar from "../components/PublicScreen/PublicScreenLeftbar";
import PublicScreen4Rightbar from "../components/PublicScreen4/PublicScreen4Rightbar";

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
      <div className={styles.public_screen}>
        {/* <PublicScreenLeftbar />
        <PublicScreen4Rightbar /> */}
      </div>
    </>
  );
};

export default PublicScreen4;
