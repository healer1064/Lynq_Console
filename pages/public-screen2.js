// libraries
import Head from "next/head";

// styles
import styles from "../styles/PublicScreen.module.sass";

// components
import Navbar from "../components/Navbar";
import PublicScreenLeftbar from "../components/PublicScreen/PublicScreenLeftbar";
import PublicScreen2Rightbar from "../components/PublicScreen2/PublicScreen2Rightbar";

const PublicScreen2 = () => {
  return (
    <>
      <Head>
        <title>Public Screen 2</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className={styles.public_screen}>
        {/* <PublicScreenLeftbar />
        <PublicScreen2Rightbar /> */}
      </div>
    </>
  );
};

export default PublicScreen2;
