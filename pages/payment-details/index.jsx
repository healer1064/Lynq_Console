// libraries
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Fade from "react-reveal/Fade";

// context
import ProfileContext from "../../context/profile";

// components
import PageLoading from "../../components/common/PageLoading";
import PaymentsDetails from "../../components/Payment/PaymentsDetails";

export default function PaymentDetails() {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);

  const getDetails = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    const response = await fetch(
      `https://api.lynq.app/account/clients?t=${token}&period=TODAY`,
      config
    );
    const data = await response.json();

    setData(data);
  };

  useEffect(() => {
    getDetails();
  }, [token]);

  console.log(data);

  return (
    <>
      <Head>
        <title>Details | Lynq</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="content-wrp ">
        {!data ? (
          <PageLoading />
        ) : (
          <Fade>
            <div className="payment">
              <PaymentsDetails data={data} />
            </div>
          </Fade>
        )}
        <br />
      </div>
    </>
  );
}
