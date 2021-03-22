// libraries
import Head from "next/head";
import { useState, useEffect, useContext } from "react";

// context
import ProfileContext from "../../context/profile";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import NewAppointmentModal from "../../components/Support/NewAppointmentModal";

export default function Contact() {
  // states
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);

  // useContext
  const { token } = useContext(ProfileContext);

  const handleSubmit = () => {
    if (message !== "") {
      setMessageError(false);
      sendRequest();
    } else {
      setMessageError(true);
    }
  };

  const sendRequest = () => {
    const _reqData = {
      message: message,
    };

    async function support() {
      // const response = await fetch("/api/support/request", {
      //   headers: new Headers({
      //     data: JSON.stringify({ token, _reqData }),
      //   }),
      // });

      const response = await fetch(
        `https://reb00t.uc.r.appspot.com/account/support-request?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: _reqData,
        }
      );

      return await response;
    }

    support()
      .then((res) => {
        console.log("support request", res);
        setModal(true);
      })
      .catch((err) => {
        console.log("error support request", err);
      });
  };

  return (
    <>
      <Head>
        <title>Support</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar active="contact" />
      <div className="page-wrp">
        <Leftbar active="contact" />
        <div className="content-wrp">
          <div className="new-appointment">
            <h3>Support</h3>
            <p>
              At Lynq, we are commited to providing you with a great and
              reliable experience.
            </p>
            <div>
              <h3>Type your request</h3>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  e.target.value !== "" && setMessageError(false);
                }}
              ></textarea>
            </div>
            {messageError && (
              <p style={{ color: "red", marginTop: "-0px" }}>
                *Please type your request
              </p>
            )}
            <button onClick={handleSubmit}>Send Request</button>
          </div>
        </div>
      </div>
      {modal && <NewAppointmentModal setModal={setModal} />}
    </>
  );
}
