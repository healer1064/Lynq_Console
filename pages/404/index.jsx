// libraries
import Head from "next/head";

// styles
import styles from "./styles.module.sass";

// components
import Navbar from "@/components/common/Navbar";

const ErrorPage = () => {
  return (
    <>
      <Head>
        <title>404 - Page not found | Lynq</title>
      </Head>
      <div className={styles.error}>
        <Navbar flag="404" />
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
