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
        <h5>TERMS</h5>
        <p>
          These Terms of Service (“Terms”) govern your use of the Lynq service
          (the “Service” or “Lynq”) provided by Linq Corp(the “Company”) and
          constitute a contract between you and the Company. These terms govern
          your access to and use of Lynq, and any content (video, sound, text,
          graphics, or other materials sent, received, stored or otherwise
          appearing in the Service, collectively referred to as "Content").
          Parts of the Service may display Content that is not Lynq’s (“User
          Content”). Such content is the sole responsibility of the person or
          entity that has made it available. When "Content" is used in this
          document, it refers to both content provided by Lynq and User Content
          collectively, unless otherwise specified.
          <br />
          By registering for, accessing and/or using Lynq and/or any part of the
          Service, you are agreeing to be bound by these terms of service, all
          applicable laws and regulations, and agree that you are responsible
          for compliance with any applicable local laws. If you do not agree
          with any of these terms, you are prohibited from using or accessing
          Lynq or any part of the Service. The materials contained in Lynq are
          protected by applicable copyright and trademark law.
          <br />
          Linq corp revise these terms of service at any time without notice. By
          using Lynq you are agreeing to be bound by such revisions or
          modifications. You are responsible for reviewing these Terms
          periodically. Your continued use of the Services after the effective
          date of the change or modification of these Terms will constitute your
          acceptance of the revised Terms. If you don’t agree to the new Terms,
          you must stop using your account before they take effect, and inform
          Lynq (expert@lynq.app) to delete your account, otherwise the use of
          the Service and Content will be subject to the new Terms.
        </p>
        <h5>AGE LIMITATIONS</h5>
        <p>
          You declare that by acceptance of these Terms and/or by using the
          Services you are at least 18 or older. You may not use Lynq and may
          not accept these Terms if you are a person barred from using Lynq or
          providing the Services under the laws of the country in which you are
          resident or from which you use Lynq.
        </p>
        <h6>SERVICE</h6>
        Lynq offers a service that allows Clients to connect with and pay
        Experts for advice and personalized mentorship (“Expert advice”). Expert
        advice are not provided, delivered, owned, controlled, created, managed,
        or vetted by Lynq, and Experts are fully responsible for their content
        and Expert advice. Any and all Expert advice transactions between the
        Expert and the Client are limited to these two parties, Lynq is not a
        party in the transaction between Experts and Clients (collectively
        “Users”), and is not acting as an agent to any party, except for
        capturing Service Fees. Lynq does not have any control over and does not
        endorse any Expert advice.
      </div>
    </>
  );
};

export default index;
