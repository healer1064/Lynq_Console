// libraries
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import AnswersList from "../../../components/Appointments/Answers/AnswersList";
import PageLoading from "../../../components/common/PageLoading";

// context
import ProfileContext from "../../../context/profile";

const fake = [
  {
    id: 1,
    name: "Full Meditaion",
    create_date: "04/25/2021",
    first_name: "Chuck",
    last_name: "Norris",
    email: "chuck@chuck.com",
  },
  {
    id: 2,
    name: "Half Meditaion",
    create_date: "04/27/2021",
    first_name: "Chucky",
    email: "chuck@chuck.com",
    last_name: "Chuck",
  },
];

export default function Answers() {
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
      <div className="content-wrp">
        {!answers ? (
          <PageLoading />
        ) : (
          <Fade>
            <AnswersList
              answersList={answers}
              success={success}
              setSuccess={setSuccess}
            />
            <br />
          </Fade>
        )}
      </div>
    </>
  );
}
