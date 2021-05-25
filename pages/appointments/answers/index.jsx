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

export default function Answers() {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    if (token) {
      fetchAnswers();
    }
  }, [token]);

  const fetchAnswers = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(
        `https://api.lynq.app/async/requests/archived?t=${token}`,
        config
      );
      const _data = await response.json();
      setAnswers(_data.content);
    } catch (err) {
      setAnswers([]);
      toast.error("Error, Failed to Fetch Answers List!");
    }
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
            <AnswersList answersList={answers.reverse()} />
            <br />
          </Fade>
        )}
      </div>
    </>
  );
}
