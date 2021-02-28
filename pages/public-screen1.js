// libraries
import Head from "next/head";

// components
import Navbar from "../components/Navbar";
import PublicScreenAbout from "../components/PublicScreen/PublicScreenAbout";
import PublicScreenDropdown from "../components/PublicScreen1/PublicScreenDropwdown";

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
      <div className="public-screen">
        <div className="public-screen-gradient" />
        <PublicScreenAbout />
        <div className="public-screen-1-hr" />
        <div className="public-screen-1-body">
          <h3>Book a session</h3>
          <PublicScreenDropdown />
        </div>
      </div>
    </>
  );
};

export default PublicScreen1;
