// libraries
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../../context/profile";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import NewAppointmentModal from "../../components/Support/NewAppointmentModal";
import Loading from "../../components/common/Loading";

export default function Contact() {
  // router
  const router = useRouter();

  // states
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [loading, setLoading] = useState(false);

  // useContext
  const { token } = useContext(ProfileContext);

  useEffect(() => {
    if (
      localStorage.getItem("linqToken") === null &&
      localStorage == undefined
    ) {
      router.push("/login");
    }
  }, []);

  const handleSubmit = () => {
    if (message !== "") {
      setLoading(true);
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
      const response = await fetch(
        `https://api.lynq.app/account/support-request?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_reqData),
        }
      );

      return await response;
    }

    support().then((res) => {
      setLoading(false);
      if (res.status == 200) {
        console.log("support request  done", res);
        setModal(true);
      } else {
        toast.error("An error has occurred");
        console.log("support request  error", res);
      }
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
            <ToastContainer />
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
            <button style={{ position: "relative" }} onClick={handleSubmit}>
              {loading && <Loading />}Send Request
            </button>
          </div>
        </div>
      </div>
      {modal && <NewAppointmentModal setModal={setModal} />}
    </>
  );
}
