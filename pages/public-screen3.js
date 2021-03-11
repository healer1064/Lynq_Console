// libraries
import Head from "next/head";

// styles
import styles from "../styles/PublicScreen.module.sass";

// components
import Navbar from "../components/Navbar";
import PublicScreenLeftbar from "../components/PublicScreen/PublicScreenLeftbar";
import PublicScreen3Rightbar from "../components/PublicScreen3/PublicScreen3Rightbar";

const PublicScreen3 = () => {
  return (
    <>
      <Head>
        <title>Public Screen 3</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className={styles.public_screen}>
        {/* <PublicScreenLeftbar />
        <PublicScreen3Rightbar /> */}
      </div>
    </>
  );
};

export default PublicScreen3;
