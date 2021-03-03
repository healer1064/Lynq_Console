// libraries
import Head from "next/head";

// styles
import styles from "../styles/PublicScreen.module.sass";

// components
import Navbar from "../components/Navbar";
import PublicScreenDropdown from "../components/PublicScreen1/PublicScreenDropwdown";
import PublicScreenLeftbar from "../components/PublicScreen/PublicScreenLeftbar";
import PublicScreenRightbar from "../components/PublicScreen/PublicScreenRightbar";

const PublicScreen1 = () => {
  return (
    <>
      <Head>
        <title>Public Screen</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className={styles.public_screen}>
        <PublicScreenLeftbar />
        <PublicScreenRightbar />
      </div>
    </>
  );
};

export default PublicScreen1;
