// libraries
import Head from "next/head";
import { useState } from "react";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import NewAppointmentModal from "../../components/NewAppointment/NewAppointmentModal";

export default function Contact() {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);

  const handleSubmit = () => {
    if (message !== "") {
      setMessageError(false);

      const _reqData = {
        message: message,
      };

      const token = localStorage.getItem("linqToken");

      async function support() {
        const response = await fetch("/api/support/request");

        return await response.json();
      }

      support()
        .then((res) => {
          console.log("support request", res);
          setModal(true);
        })
        .catch((err) => {
          console.log("support request", err);
        });
    } else {
      setMessageError(true);
    }
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
