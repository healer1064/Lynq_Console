// libraries
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Navbar from "../../../components/Navbar";
import Leftbar from "../../../components/Leftbar";
import AnswersList from "../../../components/Appointments/Answers/AnswersList";
import PageLoading from "../../../components/common/PageLoading";

// context
import ProfileContext from "../../../context/profile";

const fake = [
  {
    id: 1,
    name: "Full Meditaion",
    date: "04/25/2021",
    first_name: "Chuck",
    last_name: "Norris",
  },
  {
    id: 2,
    name: "Half Meditaion",
    date: "04/27/2021",
    first_name: "Chucky",
    last_name: "Chuck",
  },
];

export default function Answers() {
  // router
  const router = useRouter();

  // context
  const { token } = useContext(ProfileContext);

  // states
  const [answers, setAnswers] = useState(null);
  const [success, setSuccess] = useState(false);
  //   const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (token) {
      fetchAnswers();
    }
  }, [token, success]);

  const fetchAnswers = async () => {
    // const config = {
    //   method: "GET",
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    // };
    // try {
    //   const response = await fetch(
    //     `https://api.lynq.app/account/appointments/requests?t=${token}`,
    //     config
    //   );
    //   const _data = await response.json();
    //   setRequests(_data);
    // } catch (err) {
    //   setRequests([]);
    //   toast.error("Error, Failed to Fetch Request List!!!");
    // }

    setTimeout(() => {
      setAnswers(fake);
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Answers | Lynq</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar active="answers" />
      <ToastContainer />
      <div className="page-wrp">
        <Leftbar active="answers" />
        <div className="content-wrp">
          {!answers ? (
            <PageLoading />
          ) : (
            <Fade>
              {/* <div style={{ margin: "0px" }} className="payment-filter">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="completed">Scheduled video call</option>
                  <option value="coming">Asynchronous video call</option>
                </select>
              </div> */}
              {/* <RequestList
                requestList={requests}
                success={success}
                setSuccess={setSuccess}
              /> */}
              <AnswersList
                answersList={answers}
                success={success}
                setSuccess={setSuccess}
              />
              <br />
            </Fade>
          )}
        </div>
      </div>
    </>
  );
}
