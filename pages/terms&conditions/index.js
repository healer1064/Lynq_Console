// libraries
import Head from "next/head";

// styles
import styles from "../../styles/Terms&Conditions.module.sass";

// components
import Navbar from "../../components/Navbar";

const index = () => {
  return (
    <>
      <Head>
        <title>Terms & Conditions</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className={styles.toc}>
        <h1>Effective as of March, 2021</h1>
        <h3>LYNQ TERMS OF SERVICE</h3>
        <p>
           These Terms of Service (“Terms”) govern your use of the Lynq service
          (the “Service” or “Lynq”) provided by Lynq Corp(the “Company”) and
          constitute a contract between you and the Company. These terms govern
          your access to and use of Lynq, and any content (video, sound, text,
          graphics, or other materials sent, received, stored or otherwise
          appearing in the Service,
        </p>
        <span>xxxxxxxx</span>
        <span>xxx</span>
        <span>xxxxxx</span>
      </div>
    </>
  );
};

export default index;
