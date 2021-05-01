import Head from "next/head";

// styles
import styles from "../styles/Error.module.sass";

// components
import Navbar from "../components/PublicScreen/PublicScreenNavbar";

const ErrorPage = () => {
  return (
    <>
      <Head>
        <title>404 - Lynq</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.error}>
        <Navbar />
        <div className={styles.content}>
          <h1>Whoops!</h1>
          <h2>404 Page not found</h2>
          <img src="/img/bears.gif" alt="" />
          <h3>Looks like this page went on vacation</h3>
          <h4>Try our homepage instead</h4>
          <a href="/">
            <button>Lynq Home</button>
          </a>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
